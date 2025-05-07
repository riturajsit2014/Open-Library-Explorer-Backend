import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Book } from './book.entity';
import { Loan } from './loan.entity';
import { Reservation } from './reservation.entity';

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  LOANED = 'LOANED',
  RESERVED = 'RESERVED',
  MAINTENANCE = 'MAINTENANCE',
  LOST = 'LOST',
}

@Entity('book_copies')
export class BookCopy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  barcode: string;

  @Column({
    type: 'enum',
    enum: BookStatus,
    default: BookStatus.AVAILABLE
  })
  status: BookStatus;

  @ManyToOne(() => Book, book => book.copies)
  book: Book;

  @OneToMany(() => Loan, loan => loan.bookCopy)
  loans: Loan[];

  @OneToMany(() => Reservation, reservation => reservation.bookCopy)
  reservations: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 