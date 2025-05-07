import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';

const PROTO_PATH = join(__dirname, '../src/proto/book.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition);

export class LibraryClient {
  private client: any;

  constructor(address: string) {
    this.client = new (proto.book as any).BookService(
      address,
      grpc.credentials.createInsecure()
    );
  }

  createBook(book: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.CreateBook(book, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  getBook(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = { id };
      this.client.GetBook(request, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  listBooks(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.ListBooks(params, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}

async function main() {
  const client = new LibraryClient('localhost:5000');

  try {
    // Create a book
    const book = await client.createBook({
      title: 'Test Book',
      author: 'Test Author',
      isbn: '1234567890',
    });
    console.log('Created book:', book);

    // Get a book
    const retrievedBook = await client.getBook(book.id);
    console.log('Retrieved book:', retrievedBook);

    // List books
    const books = await client.listBooks({});
    console.log('List of books:', books);
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 