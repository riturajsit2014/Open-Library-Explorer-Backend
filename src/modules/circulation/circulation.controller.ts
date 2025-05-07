import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CirculationService } from './circulation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/enums/user-role.enum';
import { CreateLoanDto } from './dto/create-loan.dto';

@Controller('circulation')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CirculationController {
  constructor(private readonly circulationService: CirculationService) {}

  @Post('loans')
  async createLoan(@Body() createLoanDto: CreateLoanDto) {
    return this.circulationService.createLoan(createLoanDto);
  }

  @Post('loans/:id/return')
  async returnBook(@Param('id') id: string) {
    return this.circulationService.returnBook(id);
  }

  @Get('loans/overdue')
  async getOverdueLoans() {
    return this.circulationService.getOverdueLoans();
  }

  @Get('member/:memberId/active')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  async getActiveLoans(@Param('memberId') memberId: string) {
    return this.circulationService.getActiveLoans(memberId);
  }
} 