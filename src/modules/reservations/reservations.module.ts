import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../../entities/reservation.entity';
import { BookCopy } from '../../entities/book-copy.entity';
import { Member } from '../../entities/member.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { BooksModule } from '../books/books.module';
import { MembersModule } from '../members/members.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, BookCopy, Member]),
    BooksModule,
    MembersModule,
    NotificationsModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {} 