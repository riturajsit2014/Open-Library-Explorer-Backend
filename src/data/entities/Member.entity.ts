import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Loan } from './Loan.entity';
  import { HoldRequest } from './HoldRequest.entity';
  
  export type Role = 'patron' | 'librarian' | 'admin';
  
  @Entity()
  export class Member {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ type: 'enum', enum: ['patron', 'librarian', 'admin'], default: 'patron' })
    role: Role;
  
    @Column()
    passwordHash: string;
  
    @OneToMany(() => Loan, (loan) => loan.member)
    loans: Loan[];
  
    @OneToMany(() => HoldRequest, (hold) => hold.member)
    holds: HoldRequest[];
  }
  