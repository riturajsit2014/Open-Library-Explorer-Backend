// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var member_pb = require('./member_pb.js');

function serialize_member_CreateMemberRequest(arg) {
  if (!(arg instanceof member_pb.CreateMemberRequest)) {
    throw new Error('Expected argument of type member.CreateMemberRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_member_CreateMemberRequest(buffer_arg) {
  return member_pb.CreateMemberRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_member_DeleteMemberRequest(arg) {
  if (!(arg instanceof member_pb.DeleteMemberRequest)) {
    throw new Error('Expected argument of type member.DeleteMemberRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_member_DeleteMemberRequest(buffer_arg) {
  return member_pb.DeleteMemberRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_member_Empty(arg) {
  if (!(arg instanceof member_pb.Empty)) {
    throw new Error('Expected argument of type member.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_member_Empty(buffer_arg) {
  return member_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_member_GetMemberRequest(arg) {
  if (!(arg instanceof member_pb.GetMemberRequest)) {
    throw new Error('Expected argument of type member.GetMemberRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_member_GetMemberRequest(buffer_arg) {
  return member_pb.GetMemberRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_member_ListMembersRequest(arg) {
  if (!(arg instanceof member_pb.ListMembersRequest)) {
    throw new Error('Expected argument of type member.ListMembersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_member_ListMembersRequest(buffer_arg) {
  return member_pb.ListMembersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_member_ListMembersResponse(arg) {
  if (!(arg instanceof member_pb.ListMembersResponse)) {
    throw new Error('Expected argument of type member.ListMembersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_member_ListMembersResponse(buffer_arg) {
  return member_pb.ListMembersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_member_Member(arg) {
  if (!(arg instanceof member_pb.Member)) {
    throw new Error('Expected argument of type member.Member');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_member_Member(buffer_arg) {
  return member_pb.Member.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_member_UpdateMemberRequest(arg) {
  if (!(arg instanceof member_pb.UpdateMemberRequest)) {
    throw new Error('Expected argument of type member.UpdateMemberRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_member_UpdateMemberRequest(buffer_arg) {
  return member_pb.UpdateMemberRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// Member service definition
var MemberServiceService = exports.MemberServiceService = {
  createMember: {
    path: '/member.MemberService/CreateMember',
    requestStream: false,
    responseStream: false,
    requestType: member_pb.CreateMemberRequest,
    responseType: member_pb.Member,
    requestSerialize: serialize_member_CreateMemberRequest,
    requestDeserialize: deserialize_member_CreateMemberRequest,
    responseSerialize: serialize_member_Member,
    responseDeserialize: deserialize_member_Member,
  },
  getMember: {
    path: '/member.MemberService/GetMember',
    requestStream: false,
    responseStream: false,
    requestType: member_pb.GetMemberRequest,
    responseType: member_pb.Member,
    requestSerialize: serialize_member_GetMemberRequest,
    requestDeserialize: deserialize_member_GetMemberRequest,
    responseSerialize: serialize_member_Member,
    responseDeserialize: deserialize_member_Member,
  },
  listMembers: {
    path: '/member.MemberService/ListMembers',
    requestStream: false,
    responseStream: false,
    requestType: member_pb.ListMembersRequest,
    responseType: member_pb.ListMembersResponse,
    requestSerialize: serialize_member_ListMembersRequest,
    requestDeserialize: deserialize_member_ListMembersRequest,
    responseSerialize: serialize_member_ListMembersResponse,
    responseDeserialize: deserialize_member_ListMembersResponse,
  },
  updateMember: {
    path: '/member.MemberService/UpdateMember',
    requestStream: false,
    responseStream: false,
    requestType: member_pb.UpdateMemberRequest,
    responseType: member_pb.Member,
    requestSerialize: serialize_member_UpdateMemberRequest,
    requestDeserialize: deserialize_member_UpdateMemberRequest,
    responseSerialize: serialize_member_Member,
    responseDeserialize: deserialize_member_Member,
  },
  deleteMember: {
    path: '/member.MemberService/DeleteMember',
    requestStream: false,
    responseStream: false,
    requestType: member_pb.DeleteMemberRequest,
    responseType: member_pb.Empty,
    requestSerialize: serialize_member_DeleteMemberRequest,
    requestDeserialize: deserialize_member_DeleteMemberRequest,
    responseSerialize: serialize_member_Empty,
    responseDeserialize: deserialize_member_Empty,
  },
};

exports.MemberServiceClient = grpc.makeGenericClientConstructor(MemberServiceService, 'MemberService');
