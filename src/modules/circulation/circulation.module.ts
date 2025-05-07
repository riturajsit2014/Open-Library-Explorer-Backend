import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from '../../entities/loan.entity';
import { BookCopy } from '../../entities/book-copy.entity';
import { Member } from '../../entities/member.entity';
import { CirculationController } from './circulation.controller';
import { CirculationService } from './circulation.service';
import { BooksModule } from '../books/books.module';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan, BookCopy, Member]),
    BooksModule,
    MembersModule,
  ],
  controllers: [CirculationController],
  providers: [CirculationService],
  exports: [CirculationService],
})
export class CirculationModule {} 