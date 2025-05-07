import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BookGrpcService } from './book.service';
import { MemberGrpcService } from './member.service';
import { LoanGrpcService } from './loan.service';
import { BooksModule } from '../modules/books/books.module';
import { MembersModule } from '../modules/members/members.module';
import { LoansModule } from '../modules/loans/loans.module';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../modules/auth/auth.module';

// Use absolute path to proto files
const protoPath = join(__dirname, '..', 'proto');

@Module({
  imports: [
    BooksModule,
    MembersModule,
    LoansModule,
    CommonModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'BOOK_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'book',
          protoPath: join(protoPath, 'book.proto'),
          url: 'localhost:5000',
          loader: {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
          },
        },
      },
      {
        name: 'MEMBER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'member',
          protoPath: join(protoPath, 'member.proto'),
          url: 'localhost:5001',
          loader: {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
          },
        },
      },
      {
        name: 'LOAN_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'loan',
          protoPath: join(protoPath, 'loan.proto'),
          url: 'localhost:5002',
          loader: {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
          },
        },
      },
    ]),
  ],
  providers: [BookGrpcService, MemberGrpcService, LoanGrpcService],
  exports: [BookGrpcService, MemberGrpcService, LoanGrpcService],
})
export class GrpcModule {} 