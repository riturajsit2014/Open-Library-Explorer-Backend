import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Loan } from './loan.entity';
import { Reservation } from './reservation.entity';

export enum MembershipTier {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  VIP = 'VIP'
}

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: MembershipTier,
    default: MembershipTier.BASIC
  })
  membershipTier: MembershipTier;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Loan, loan => loan.member)
  loans: Loan[];

  @OneToMany(() => Reservation, reservation => reservation.member)
  reservations: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 