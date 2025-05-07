import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Member } from './member.entity';
import { BookCopy } from './book-copy.entity';

export enum ReservationStatus {
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED'
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Member, member => member.reservations)
  member: Member;

  @ManyToOne(() => BookCopy, bookCopy => bookCopy.reservations)
  bookCopy: BookCopy;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING
  })
  status: ReservationStatus;

  @Column({ type: 'timestamp' })
  reservationDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  fulfillmentDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiryDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  pickupDeadline: Date;

  @Column({ default: false })
  isNotified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 