import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Copy } from './Copy.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  author?: string;

  @Column({ nullable: true })
  isbn?: string;

  @Column({ type: 'date', nullable: true })
  publishedAt?: Date;

  @OneToMany(() => Copy, (copy) => copy.book)
  copies: Copy[];
}
