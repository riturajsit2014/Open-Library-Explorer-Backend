import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

export class GrpcError extends RpcException {
  constructor(message: string, code: number = HttpStatus.INTERNAL_SERVER_ERROR) {
    super({
      code,
      message,
    });
  }
}

export const handleGrpcError = (error: any) => {
  if (error instanceof GrpcError) {
    throw error;
  }

  if (error.code === '23505') { // PostgreSQL unique violation
    throw new GrpcError('Resource already exists', HttpStatus.CONFLICT);
  }

  if (error.code === '23503') { // PostgreSQL foreign key violation
    throw new GrpcError('Referenced resource not found', HttpStatus.NOT_FOUND);
  }

  if (error.name === 'EntityNotFoundError') {
    throw new GrpcError('Resource not found', HttpStatus.NOT_FOUND);
  }

  if (error.name === 'ValidationError') {
    throw new GrpcError(error.message, HttpStatus.BAD_REQUEST);
  }

  throw new GrpcError('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
}; 