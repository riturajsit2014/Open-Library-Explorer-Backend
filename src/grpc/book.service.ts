import { Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BooksService } from '../modules/books/books.service';
import { CreateBookDto } from '../modules/books/dto/create-book.dto';
import { UpdateBookDto } from '../modules/books/dto/update-book.dto';

@Injectable()
export class BookGrpcService {
  constructor(private readonly booksService: BooksService) {}

  @GrpcMethod('BookService', 'CreateBook')
  async createBook(data: CreateBookDto) {
    return this.booksService.create(data);
  }

  @GrpcMethod('BookService', 'GetBook')
  async getBook(data: { id: string }) {
    return this.booksService.findOne(data.id);
  }

  @GrpcMethod('BookService', 'ListBooks')
  async listBooks(data: { page: number; limit: number; search?: string; genre?: string; author?: string }) {
    const options = {
      page: data.page || 1,
      limit: data.limit || 10,
      search: data.search,
      genre: data.genre,
      author: data.author,
    };
    const baseUrl = '/books';
    const result = await this.booksService.findAll(options, baseUrl);
    return {
      books: result.items,
      total: result.meta.totalItems,
      page: result.meta.currentPage,
      limit: result.meta.itemsPerPage,
    };
  }

  @GrpcMethod('BookService', 'UpdateBook')
  async updateBook(data: UpdateBookDto) {
    const { id, ...updateData } = data;
    return this.booksService.update(id, updateData as UpdateBookDto);
  }

  @GrpcMethod('BookService', 'DeleteBook')
  async deleteBook(data: { id: string }) {
    await this.booksService.remove(data.id);
    return {};
  }
} 