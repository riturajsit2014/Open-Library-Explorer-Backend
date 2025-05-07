import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BookCopy } from './book-copy.entity';

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  ON_LOAN = 'ON_LOAN',
  RESERVED = 'RESERVED',
  LOST = 'LOST'
}

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  isbn: string;

  @Column()
  title: string;

  @Column('text', { array: true })
  authors: string[];

  @Column('text', { array: true })
  subjects: string[];

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  publicationYear: number;

  @Column({ type: 'varchar', nullable: true })
  publisher: string;

  @OneToMany(() => BookCopy, copy => copy.book)
  copies: BookCopy[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 