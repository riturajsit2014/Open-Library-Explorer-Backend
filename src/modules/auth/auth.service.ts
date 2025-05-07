import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MembersService } from '../members/members.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private membersService: MembersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const member = await this.membersService.findByEmail(email);
    if (member && (await bcrypt.compare(password, member.password))) {
      const { password, ...result } = member;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const member = await this.validateUser(email, password);
    if (!member) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: member.id,
      email: member.email,
      role: member.membershipTier,
    };

    return {
      access_token: this.jwtService.sign(payload),
      member,
    };
  }
} 