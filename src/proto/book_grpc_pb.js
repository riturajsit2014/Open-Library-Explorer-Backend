// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var book_pb = require('./book_pb.js');

function serialize_book_Book(arg) {
  if (!(arg instanceof book_pb.Book)) {
    throw new Error('Expected argument of type book.Book');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_book_Book(buffer_arg) {
  return book_pb.Book.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_book_CreateBookRequest(arg) {
  if (!(arg instanceof book_pb.CreateBookRequest)) {
    throw new Error('Expected argument of type book.CreateBookRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_book_CreateBookRequest(buffer_arg) {
  return book_pb.CreateBookRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_book_DeleteBookRequest(arg) {
  if (!(arg instanceof book_pb.DeleteBookRequest)) {
    throw new Error('Expected argument of type book.DeleteBookRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_book_DeleteBookRequest(buffer_arg) {
  return book_pb.DeleteBookRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_book_Empty(arg) {
  if (!(arg instanceof book_pb.Empty)) {
    throw new Error('Expected argument of type book.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_book_Empty(buffer_arg) {
  return book_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_book_GetBookRequest(arg) {
  if (!(arg instanceof book_pb.GetBookRequest)) {
    throw new Error('Expected argument of type book.GetBookRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_book_GetBookRequest(buffer_arg) {
  return book_pb.GetBookRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_book_ListBooksRequest(arg) {
  if (!(arg instanceof book_pb.ListBooksRequest)) {
    throw new Error('Expected argument of type book.ListBooksRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_book_ListBooksRequest(buffer_arg) {
  return book_pb.ListBooksRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_book_ListBooksResponse(arg) {
  if (!(arg instanceof book_pb.ListBooksResponse)) {
    throw new Error('Expected argument of type book.ListBooksResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_book_ListBooksResponse(buffer_arg) {
  return book_pb.ListBooksResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_book_UpdateBookRequest(arg) {
  if (!(arg instanceof book_pb.UpdateBookRequest)) {
    throw new Error('Expected argument of type book.UpdateBookRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_book_UpdateBookRequest(buffer_arg) {
  return book_pb.UpdateBookRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// Book service definition
var BookServiceService = exports.BookServiceService = {
  createBook: {
    path: '/book.BookService/CreateBook',
    requestStream: false,
    responseStream: false,
    requestType: book_pb.CreateBookRequest,
    responseType: book_pb.Book,
    requestSerialize: serialize_book_CreateBookRequest,
    requestDeserialize: deserialize_book_CreateBookRequest,
    responseSerialize: serialize_book_Book,
    responseDeserialize: deserialize_book_Book,
  },
  getBook: {
    path: '/book.BookService/GetBook',
    requestStream: false,
    responseStream: false,
    requestType: book_pb.GetBookRequest,
    responseType: book_pb.Book,
    requestSerialize: serialize_book_GetBookRequest,
    requestDeserialize: deserialize_book_GetBookRequest,
    responseSerialize: serialize_book_Book,
    responseDeserialize: deserialize_book_Book,
  },
  listBooks: {
    path: '/book.BookService/ListBooks',
    requestStream: false,
    responseStream: false,
    requestType: book_pb.ListBooksRequest,
    responseType: book_pb.ListBooksResponse,
    requestSerialize: serialize_book_ListBooksRequest,
    requestDeserialize: deserialize_book_ListBooksRequest,
    responseSerialize: serialize_book_ListBooksResponse,
    responseDeserialize: deserialize_book_ListBooksResponse,
  },
  updateBook: {
    path: '/book.BookService/UpdateBook',
    requestStream: false,
    responseStream: false,
    requestType: book_pb.UpdateBookRequest,
    responseType: book_pb.Book,
    requestSerialize: serialize_book_UpdateBookRequest,
    requestDeserialize: deserialize_book_UpdateBookRequest,
    responseSerialize: serialize_book_Book,
    responseDeserialize: deserialize_book_Book,
  },
  deleteBook: {
    path: '/book.BookService/DeleteBook',
    requestStream: false,
    responseStream: false,
    requestType: book_pb.DeleteBookRequest,
    responseType: book_pb.Empty,
    requestSerialize: serialize_book_DeleteBookRequest,
    requestDeserialize: deserialize_book_DeleteBookRequest,
    responseSerialize: serialize_book_Empty,
    responseDeserialize: deserialize_book_Empty,
  },
};

exports.BookServiceClient = grpc.makeGenericClientConstructor(BookServiceService, 'BookService');
