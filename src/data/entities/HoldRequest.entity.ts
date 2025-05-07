import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { Copy } from './Copy.entity';
  import { Member } from './Member.entity';
  
  @Entity()
  export class HoldRequest {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Copy, (copy) => copy.holds, { onDelete: 'CASCADE' })
    copy: Copy;
  
    @ManyToOne(() => Member, (member) => member.holds, { onDelete: 'CASCADE' })
    member: Member;
  
    @CreateDateColumn()
    requestedAt: Date;
  
    @Column({ default: false })
    notified: boolean;
  }
  