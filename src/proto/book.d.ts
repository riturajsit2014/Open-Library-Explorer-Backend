export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publication_year: number;
  genre: string;
  description?: string;
  total_copies: number;
  available_copies: number;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publication_year: number;
  genre: string;
  description?: string;
  total_copies: number;
  location: string;
}

export interface UpdateBookRequest {
  id: string;
  title?: string;
  author?: string;
  isbn?: string;
  publisher?: string;
  publication_year?: number;
  genre?: string;
  description?: string;
  total_copies?: number;
  location?: string;
}

export interface GetBookRequest {
  id: string;
}

export interface ListBooksRequest {
  page: number;
  limit: number;
  search?: string;
  genre?: string;
  author?: string;
}

export interface ListBooksResponse {
  books: Book[];
  total: number;
  page: number;
  limit: number;
}

export interface DeleteBookRequest {
  id: string;
}

export interface Empty {}

export interface BookServiceClient {
  createBook(request: CreateBookRequest): Promise<Book>;
  getBook(request: GetBookRequest): Promise<Book>;
  listBooks(request: ListBooksRequest): Promise<ListBooksResponse>;
  updateBook(request: UpdateBookRequest): Promise<Book>;
  deleteBook(request: DeleteBookRequest): Promise<Empty>;
}

export interface BookService {
  createBook(request: CreateBookRequest): Promise<Book>;
  getBook(request: GetBookRequest): Promise<Book>;
  listBooks(request: ListBooksRequest): Promise<ListBooksResponse>;
  updateBook(request: UpdateBookRequest): Promise<Book>;
  deleteBook(request: DeleteBookRequest): Promise<Empty>;
}

export interface ProtoGrpcType {
  book: {
    Book: Book;
    CreateBookRequest: CreateBookRequest;
    UpdateBookRequest: UpdateBookRequest;
    GetBookRequest: GetBookRequest;
    ListBooksRequest: ListBooksRequest;
    ListBooksResponse: ListBooksResponse;
    DeleteBookRequest: DeleteBookRequest;
    Empty: Empty;
    BookService: BookService;
  };
} 