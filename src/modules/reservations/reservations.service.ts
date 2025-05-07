import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation, ReservationStatus } from '../../entities/reservation.entity';
import { BookCopy, BookStatus } from '../../entities/book-copy.entity';
import { Member } from '../../entities/member.entity';
import { addDays } from 'date-fns';
import { NotificationsService, NotificationType } from '../notifications/notifications.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    @InjectRepository(BookCopy)
    private bookCopiesRepository: Repository<BookCopy>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    private notificationsService: NotificationsService,
  ) {}

  async placeReservation(memberId: string, bookCopyId: string): Promise<Reservation> {
    const member = await this.membersRepository.findOne({
      where: { id: memberId },
    });
    if (!member) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }

    if (member.isBlocked) {
      throw new BadRequestException('Member account is blocked');
    }

    const bookCopy = await this.bookCopiesRepository.findOne({
      where: { id: bookCopyId },
    });
    if (!bookCopy) {
      throw new NotFoundException(`Book copy with ID ${bookCopyId} not found`);
    }

    if (bookCopy.status === BookStatus.AVAILABLE) {
      throw new BadRequestException('Book copy is available for checkout');
    }

    const existingReservation = await this.reservationsRepository.findOne({
      where: {
        member: { id: memberId },
        bookCopy: { id: bookCopyId },
        status: ReservationStatus.PENDING,
      },
    });

    if (existingReservation) {
      throw new BadRequestException('Member already has a pending reservation for this book');
    }

    const reservation = this.reservationsRepository.create({
      member,
      bookCopy,
      reservationDate: new Date(),
      expiryDate: addDays(new Date(), 7), // 7 days to pick up
    });

    return this.reservationsRepository.save(reservation);
  }

  async fulfillReservation(reservationId: string): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id: reservationId },
      relations: ['bookCopy', 'member', 'bookCopy.book'],
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found`);
    }

    if (reservation.status !== ReservationStatus.PENDING) {
      throw new BadRequestException('Reservation is not pending');
    }

    reservation.status = ReservationStatus.FULFILLED;
    reservation.fulfillmentDate = new Date();
    reservation.pickupDeadline = addDays(new Date(), 3); // 3 days to pick up

    const bookCopy = reservation.bookCopy;
    bookCopy.status = BookStatus.RESERVED;
    await this.bookCopiesRepository.save(bookCopy);

    // Send notification to member
    await this.notificationsService.sendNotification(
      reservation.member.id,
      NotificationType.RESERVATION_FULFILLED,
      'Reservation Fulfilled',
      `Your reservation for "${reservation.bookCopy.book.title}" is ready for pickup. Please collect it within 3 days.`,
      {
        reservationId: reservation.id,
        bookTitle: reservation.bookCopy.book.title,
        pickupDeadline: reservation.pickupDeadline,
      },
    );

    return this.reservationsRepository.save(reservation);
  }

  async cancelReservation(reservationId: string): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id: reservationId },
      relations: ['bookCopy'],
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found`);
    }

    if (reservation.status !== ReservationStatus.PENDING) {
      throw new BadRequestException('Reservation is not pending');
    }

    reservation.status = ReservationStatus.CANCELLED;

    const bookCopy = reservation.bookCopy;
    if (bookCopy.status === BookStatus.RESERVED) {
      bookCopy.status = BookStatus.AVAILABLE;
      await this.bookCopiesRepository.save(bookCopy);
    }

    return this.reservationsRepository.save(reservation);
  }

  async getPendingReservations(bookCopyId: string): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: {
        bookCopy: { id: bookCopyId },
        status: ReservationStatus.PENDING,
      },
      relations: ['member'],
      order: {
        reservationDate: 'ASC',
      },
    });
  }

  async getMemberReservations(memberId: string): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: {
        member: { id: memberId },
      },
      relations: ['bookCopy', 'bookCopy.book'],
      order: {
        reservationDate: 'DESC',
      },
    });
  }
} 