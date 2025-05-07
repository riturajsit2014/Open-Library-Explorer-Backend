import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member, MembershipTier } from '../../entities/member.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/enums/user-role.enum';

@Controller('members')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async createMember(@Body() memberData: Partial<Member>): Promise<Member> {
    return this.membersService.createMember(memberData);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async updateMember(
    @Param('id') id: string,
    @Body() memberData: Partial<Member>,
  ): Promise<Member> {
    return this.membersService.updateMember(id, memberData);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deactivateMember(@Param('id') id: string): Promise<void> {
    return this.membersService.deactivateMember(id);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async getMember(@Param('id') id: string): Promise<Member> {
    return this.membersService.findById(id);
  }

  @Put(':id/tier')
  @Roles(UserRole.ADMIN)
  async updateMembershipTier(
    @Param('id') id: string,
    @Body('tier') tier: MembershipTier,
  ): Promise<Member> {
    return this.membersService.updateMembershipTier(id, tier);
  }
} 