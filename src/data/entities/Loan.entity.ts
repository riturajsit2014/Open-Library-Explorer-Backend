import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Copy } from './Copy.entity';
  import { Member } from './Member.entity';
  
  @Entity()
  export class Loan {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Copy, (copy) => copy.loans, { onDelete: 'CASCADE' })
    copy: Copy;
  
    @ManyToOne(() => Member, (member) => member.loans, { onDelete: 'CASCADE' })
    member: Member;
  
    @CreateDateColumn()
    loanedAt: Date;
  
    @Column({ type: 'date' })
    dueDate: Date;
  
    @Column({ type: 'date', nullable: true })
    returnedAt?: Date;
  }
  