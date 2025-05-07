import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member, MembershipTier } from '../../entities/member.entity';
import * as bcrypt from 'bcrypt';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.membersRepository.create(createMemberDto);
    return this.membersRepository.save(member);
  }

  async findOne(id: string): Promise<Member> {
    return this.membersRepository.findOne({ where: { id } });
  }

  async findAll(params: any): Promise<{ data: Member[]; total: number }> {
    const [data, total] = await this.membersRepository.findAndCount({
      skip: (params.page - 1) * params.limit,
      take: params.limit,
    });
    return { data, total };
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    await this.membersRepository.update(id, updateMemberDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.membersRepository.delete(id);
  }

  async createMember(memberData: Partial<Member>): Promise<Member> {
    const existingMember = await this.findByEmail(memberData.email);
    if (existingMember) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(memberData.password, 10);
    const member = this.membersRepository.create({
      ...memberData,
      password: hashedPassword,
    });

    return this.membersRepository.save(member);
  }

  async updateMember(id: string, memberData: Partial<Member>): Promise<Member> {
    const member = await this.findById(id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    if (memberData.password) {
      memberData.password = await bcrypt.hash(memberData.password, 10);
    }

    Object.assign(member, memberData);
    return this.membersRepository.save(member);
  }

  async deactivateMember(id: string): Promise<void> {
    const member = await this.findById(id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    member.isBlocked = true;
    await this.membersRepository.save(member);
  }

  async findById(id: string): Promise<Member> {
    return this.membersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Member> {
    return this.membersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'name', 'phone', 'membershipTier', 'isBlocked'],
    });
  }

  async updateMembershipTier(
    id: string,
    tier: MembershipTier,
  ): Promise<Member> {
    const member = await this.findById(id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    member.membershipTier = tier;
    return this.membersRepository.save(member);
  }
} 