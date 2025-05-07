import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../entities/book.entity';
import { BookCopy, BookStatus } from '../../entities/book-copy.entity';
import { BooksService } from '../books/books.service';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { MarcRecord, MarcField } from 'marcjs';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

export interface ImportResult {
  success: boolean;
  totalRecords: number;
  importedRecords: number;
  failedRecords: number;
  errors?: string[];
}

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(BookCopy)
    private bookCopiesRepository: Repository<BookCopy>,
    private booksService: BooksService,
  ) {}

  async importFromCSV(filePath: string): Promise<ImportResult> {
    const result: ImportResult = {
      totalRecords: 0,
      importedRecords: 0,
      failedRecords: 0,
      success: true,
    };

    const parser = createReadStream(filePath).pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
      }),
    );

    for await (const record of parser) {
      result.totalRecords++;
      try {
        const book = await this.createBookFromCSV(record);
        result.importedRecords++;
      } catch (error) {
        result.failedRecords++;
        result.errors = result.errors || [];
        result.errors.push(`Row ${result.totalRecords}: ${error.message}`);
      }
    }

    return result;
  }

  async importFromMARC(filePath: string): Promise<ImportResult> {
    const result: ImportResult = {
      totalRecords: 0,
      importedRecords: 0,
      failedRecords: 0,
      success: true,
    };

    const stream = createReadStream(filePath);
    const marcParser = new MarcRecord();

    for await (const chunk of stream) {
      const records = marcParser.parse(chunk);
      for (const record of records) {
        result.totalRecords++;
        try {
          const book = await this.createBookFromMARC(record);
          result.importedRecords++;
        } catch (error) {
          result.failedRecords++;
          result.errors = result.errors || [];
          result.errors.push(`Record ${result.totalRecords}: ${error.message}`);
        }
      }
    }

    return result;
  }

  private async createBookFromCSV(record: any): Promise<Book> {
    const book = this.booksRepository.create({
      isbn: record.isbn,
      title: record.title,
      authors: record.authors.split(';').map((author: string) => author.trim()),
      subjects: record.subjects.split(';').map((subject: string) => subject.trim()),
      tags: record.tags ? record.tags.split(';').map((tag: string) => tag.trim()) : [],
      description: record.description,
      publicationYear: parseInt(record.publicationYear, 10),
      publisher: record.publisher,
    });

    const savedBook = await this.booksRepository.save(book);

    // Create a book copy
    const copy = this.bookCopiesRepository.create({
      book: savedBook,
      barcode: `CSV-${uuidv4()}`,
      status: BookStatus.AVAILABLE,
    });

    await this.bookCopiesRepository.save(copy);

    return savedBook;
  }

  private async createBookFromMARC(record: MarcRecord): Promise<Book> {
    const isbn = this.getMARCField(record, '020', 'a');
    const title = this.getMARCField(record, '245', 'a');
    const authors = this.getMARCFields(record, '100', 'a');
    const subjects = this.getMARCFields(record, '650', 'a');
    const description = this.getMARCField(record, '520', 'a');
    const publicationYear = this.getPublicationYear(record);
    const publisher = this.getMARCField(record, '260', 'b');

    const book = this.booksRepository.create({
      isbn,
      title,
      authors,
      subjects,
      description,
      publicationYear,
      publisher,
    });

    const savedBook = await this.booksRepository.save(book);

    // Create a book copy
    const copy = this.bookCopiesRepository.create({
      book: savedBook,
      barcode: `MARC-${uuidv4()}`,
      status: BookStatus.AVAILABLE,
    });

    await this.bookCopiesRepository.save(copy);

    return savedBook;
  }

  private getMARCField(record: MarcRecord, tag: string, subfield: string): string {
    const field = record.getField(tag);
    return field ? field.getSubfield(subfield)?.value || '' : '';
  }

  private getMARCFields(record: MarcRecord, tag: string, subfield: string): string[] {
    const fields = record.getFields(tag);
    return fields.map(field => field.getSubfield(subfield)?.value || '').filter(Boolean);
  }

  private getPublicationYear(record: MarcRecord): number {
    const date = this.getMARCField(record, '260', 'c');
    const yearMatch = date.match(/\d{4}/);
    return yearMatch ? parseInt(yearMatch[0], 10) : new Date().getFullYear();
  }
} 