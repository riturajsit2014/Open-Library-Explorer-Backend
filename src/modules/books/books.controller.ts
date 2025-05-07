import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '../../entities/book.entity';
import { BookCopy } from '../../entities/book-copy.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/enums/user-role.enum';
import { PaginationOptions } from '../../common/interfaces/pagination.interface';

@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async createBook(@Body() bookData: Partial<Book>): Promise<Book> {
    return this.booksService.createBook(bookData);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async updateBook(
    @Param('id') id: string,
    @Body() bookData: Partial<Book>,
  ): Promise<Book> {
    return this.booksService.updateBook(id, bookData);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }

  @Get('search')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN, UserRole.MEMBER)
  async search(
    @Query('q') query: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Req() req?: any,
  ) {
    const options: PaginationOptions = {
      page,
      limit,
      sortBy,
      sortOrder,
    };

    const baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;
    return this.booksService.searchBooks(query, options, baseUrl);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN, UserRole.MEMBER)
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Req() req?: any,
  ) {
    const options: PaginationOptions = {
      page,
      limit,
      sortBy,
      sortOrder,
    };

    const baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;
    return this.booksService.findAll(options, baseUrl);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN, UserRole.MEMBER)
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Post(':id/copies')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async addBookCopy(
    @Param('id') bookId: string,
    @Body('barcode') barcode: string,
  ): Promise<BookCopy> {
    return this.booksService.addBookCopy(bookId, barcode);
  }

  @Get(':id/copies/available')
  async getAvailableCopies(@Param('id') bookId: string): Promise<BookCopy[]> {
    return this.booksService.getAvailableCopies(bookId);
  }

  @Delete(':id/copies/:copyId')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  removeCopy(@Param('id') id: string, @Param('copyId') copyId: string) {
    return this.booksService.removeCopy(id, copyId);
  }
} 