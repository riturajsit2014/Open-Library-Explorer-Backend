import { Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MembersService } from '../modules/members/members.service';
import { CreateMemberDto } from '../modules/members/dto/create-member.dto';
import { UpdateMemberDto } from '../modules/members/dto/update-member.dto';

@Injectable()
export class MemberGrpcService {
  constructor(private readonly membersService: MembersService) {}

  @GrpcMethod('MemberService', 'CreateMember')
  async createMember(data: CreateMemberDto) {
    return this.membersService.create(data);
  }

  @GrpcMethod('MemberService', 'GetMember')
  async getMember(data: { id: string }) {
    return this.membersService.findOne(data.id);
  }

  @GrpcMethod('MemberService', 'ListMembers')
  async listMembers(data: { 
    page: number; 
    limit: number; 
    search?: string; 
    membership_type?: string; 
    membership_status?: string 
  }) {
    const result = await this.membersService.findAll(data);
    return {
      members: result.data,
      total: result.total,
      page: data.page,
      limit: data.limit,
    };
  }

  @GrpcMethod('MemberService', 'UpdateMember')
  async updateMember(data: UpdateMemberDto & { id: string }) {
    const { id, ...updateData } = data;
    return this.membersService.update(id, updateData);
  }

  @GrpcMethod('MemberService', 'DeleteMember')
  async deleteMember(data: { id: string }) {
    await this.membersService.remove(data.id);
    return {};
  }
} 