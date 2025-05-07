import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Book } from '../../entities/book.entity';
import { BookCopy, BookStatus } from '../../entities/book-copy.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationOptions, PaginatedResponse } from '../../common/interfaces/pagination.interface';
import { PaginationService } from '../../common/services/pagination.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(BookCopy)
    private readonly bookCopiesRepository: Repository<BookCopy>,
    private readonly paginationService: PaginationService,
  ) {}

  async createBook(bookData: Partial<Book>): Promise<Book> {
    const book = this.booksRepository.create(bookData);
    return this.booksRepository.save(book);
  }

  async updateBook(id: string, bookData: Partial<Book>): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    Object.assign(book, bookData);
    return this.booksRepository.save(book);
  }

  async deleteBook(id: string): Promise<void> {
    const result = await this.booksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  async findBookById(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['copies'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async searchBooks(
    query: string,
    options: PaginationOptions,
    baseUrl: string,
  ): Promise<PaginatedResponse<Book>> {
    const queryBuilder = this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.copies', 'copy')
      .where('book.title ILIKE :query', { query: `%${query}%` })
      .orWhere('book.author ILIKE :query', { query: `%${query}%` })
      .orWhere('book.isbn ILIKE :query', { query: `%${query}%` })
      .orWhere('book.publisher ILIKE :query', { query: `%${query}%` });

    return this.paginationService.paginate(queryBuilder, options, baseUrl);
  }

  async findAll(options: PaginationOptions, baseUrl: string): Promise<PaginatedResponse<Book>> {
    const queryBuilder = this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.copies', 'copy');

    return this.paginationService.paginate(queryBuilder, options, baseUrl);
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['copies'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    Object.assign(book, updateBookDto);
    return this.booksRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.booksRepository.remove(book);
  }

  async addBookCopy(bookId: string, barcode: string): Promise<BookCopy> {
    const book = await this.findBookById(bookId);
    const copy = this.bookCopiesRepository.create({
      book,
      barcode,
      status: BookStatus.AVAILABLE,
    });
    return this.bookCopiesRepository.save(copy);
  }

  async updateBookCopyStatus(
    copyId: string,
    status: BookStatus,
  ): Promise<BookCopy> {
    const copy = await this.bookCopiesRepository.findOne({
      where: { id: copyId },
    });
    if (!copy) {
      throw new NotFoundException(`Book copy with ID ${copyId} not found`);
    }
    copy.status = status;
    return this.bookCopiesRepository.save(copy);
  }

  async getAvailableCopies(bookId: string): Promise<BookCopy[]> {
    return this.bookCopiesRepository.find({
      where: {
        book: { id: bookId },
        status: BookStatus.AVAILABLE,
      },
    });
  }

  async addCopy(bookId: string): Promise<BookCopy> {
    const book = await this.findOne(bookId);
    const copy = this.bookCopiesRepository.create({ book });
    return this.bookCopiesRepository.save(copy);
  }

  async removeCopy(bookId: string, copyId: string): Promise<void> {
    const copy = await this.bookCopiesRepository.findOne({
      where: { id: copyId, book: { id: bookId } },
    });

    if (!copy) {
      throw new NotFoundException(`Copy with ID ${copyId} not found for book ${bookId}`);
    }

    await this.bookCopiesRepository.remove(copy);
  }
} 