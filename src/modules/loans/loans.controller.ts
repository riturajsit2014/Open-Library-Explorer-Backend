import { Controller, Get, Param, Query } from '@nestjs/common';
import { LoansService } from './loans.service';
import { Loan } from '../../entities/loan.entity';
import { PaginationOptions } from '../../common/interfaces/pagination.interface';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const options: PaginationOptions = {
      page: Number(page),
      limit: Number(limit),
    };
    const baseUrl = '/loans';
    return this.loansService.findAll(options, baseUrl);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Loan> {
    return this.loansService.findOne(id);
  }
} 