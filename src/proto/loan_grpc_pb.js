// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var loan_pb = require('./loan_pb.js');
var book_pb = require('./book_pb.js');
var member_pb = require('./member_pb.js');

function serialize_loan_CreateLoanRequest(arg) {
  if (!(arg instanceof loan_pb.CreateLoanRequest)) {
    throw new Error('Expected argument of type loan.CreateLoanRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loan_CreateLoanRequest(buffer_arg) {
  return loan_pb.CreateLoanRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loan_DeleteLoanRequest(arg) {
  if (!(arg instanceof loan_pb.DeleteLoanRequest)) {
    throw new Error('Expected argument of type loan.DeleteLoanRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loan_DeleteLoanRequest(buffer_arg) {
  return loan_pb.DeleteLoanRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loan_Empty(arg) {
  if (!(arg instanceof loan_pb.Empty)) {
    throw new Error('Expected argument of type loan.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loan_Empty(buffer_arg) {
  return loan_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loan_GetLoanRequest(arg) {
  if (!(arg instanceof loan_pb.GetLoanRequest)) {
    throw new Error('Expected argument of type loan.GetLoanRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loan_GetLoanRequest(buffer_arg) {
  return loan_pb.GetLoanRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loan_ListLoansRequest(arg) {
  if (!(arg instanceof loan_pb.ListLoansRequest)) {
    throw new Error('Expected argument of type loan.ListLoansRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loan_ListLoansRequest(buffer_arg) {
  return loan_pb.ListLoansRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loan_ListLoansResponse(arg) {
  if (!(arg instanceof loan_pb.ListLoansResponse)) {
    throw new Error('Expected argument of type loan.ListLoansResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loan_ListLoansResponse(buffer_arg) {
  return loan_pb.ListLoansResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loan_Loan(arg) {
  if (!(arg instanceof loan_pb.Loan)) {
    throw new Error('Expected argument of type loan.Loan');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loan_Loan(buffer_arg) {
  return loan_pb.Loan.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loan_UpdateLoanRequest(arg) {
  if (!(arg instanceof loan_pb.UpdateLoanRequest)) {
    throw new Error('Expected argument of type loan.UpdateLoanRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loan_UpdateLoanRequest(buffer_arg) {
  return loan_pb.UpdateLoanRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// Loan service definition
var LoanServiceService = exports.LoanServiceService = {
  createLoan: {
    path: '/loan.LoanService/CreateLoan',
    requestStream: false,
    responseStream: false,
    requestType: loan_pb.CreateLoanRequest,
    responseType: loan_pb.Loan,
    requestSerialize: serialize_loan_CreateLoanRequest,
    requestDeserialize: deserialize_loan_CreateLoanRequest,
    responseSerialize: serialize_loan_Loan,
    responseDeserialize: deserialize_loan_Loan,
  },
  getLoan: {
    path: '/loan.LoanService/GetLoan',
    requestStream: false,
    responseStream: false,
    requestType: loan_pb.GetLoanRequest,
    responseType: loan_pb.Loan,
    requestSerialize: serialize_loan_GetLoanRequest,
    requestDeserialize: deserialize_loan_GetLoanRequest,
    responseSerialize: serialize_loan_Loan,
    responseDeserialize: deserialize_loan_Loan,
  },
  listLoans: {
    path: '/loan.LoanService/ListLoans',
    requestStream: false,
    responseStream: false,
    requestType: loan_pb.ListLoansRequest,
    responseType: loan_pb.ListLoansResponse,
    requestSerialize: serialize_loan_ListLoansRequest,
    requestDeserialize: deserialize_loan_ListLoansRequest,
    responseSerialize: serialize_loan_ListLoansResponse,
    responseDeserialize: deserialize_loan_ListLoansResponse,
  },
  updateLoan: {
    path: '/loan.LoanService/UpdateLoan',
    requestStream: false,
    responseStream: false,
    requestType: loan_pb.UpdateLoanRequest,
    responseType: loan_pb.Loan,
    requestSerialize: serialize_loan_UpdateLoanRequest,
    requestDeserialize: deserialize_loan_UpdateLoanRequest,
    responseSerialize: serialize_loan_Loan,
    responseDeserialize: deserialize_loan_Loan,
  },
  deleteLoan: {
    path: '/loan.LoanService/DeleteLoan',
    requestStream: false,
    responseStream: false,
    requestType: loan_pb.DeleteLoanRequest,
    responseType: loan_pb.Empty,
    requestSerialize: serialize_loan_DeleteLoanRequest,
    requestDeserialize: deserialize_loan_DeleteLoanRequest,
    responseSerialize: serialize_loan_Empty,
    responseDeserialize: deserialize_loan_Empty,
  },
};

exports.LoanServiceClient = grpc.makeGenericClientConstructor(LoanServiceService, 'LoanService');
