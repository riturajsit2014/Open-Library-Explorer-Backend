import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Book } from './Book.entity';
  import { Loan } from './Loan.entity';
  import { HoldRequest } from './HoldRequest.entity';
  
  @Entity()
  export class Copy {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Book, (book) => book.copies, { onDelete: 'CASCADE' })
    book: Book;
  
    @Column({ default: true })
    available: boolean;
  
    @OneToMany(() => Loan, (loan) => loan.copy)
    loans: Loan[];
  
    @OneToMany(() => HoldRequest, (hold) => hold.copy)
    holds: HoldRequest[];
  }
  