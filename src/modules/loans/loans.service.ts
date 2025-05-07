import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from '../../entities/loan.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { PaginationOptions, PaginatedResponse } from '../../common/interfaces/pagination.interface';
import { PaginationService } from '../../common/services/pagination.service';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private loansRepository: Repository<Loan>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    const loan = new Loan();
    Object.assign(loan, createLoanDto);
    return this.loansRepository.save(loan);
  }

  async findAll(options: PaginationOptions, baseUrl: string): Promise<PaginatedResponse<Loan>> {
    const queryBuilder = this.loansRepository
      .createQueryBuilder('loan')
      .leftJoinAndSelect('loan.book', 'book')
      .leftJoinAndSelect('loan.member', 'member');

    return this.paginationService.paginate(queryBuilder, options, baseUrl);
  }

  async findOne(id: string): Promise<Loan> {
    const loan = await this.loansRepository.findOne({
      where: { id },
      relations: ['book', 'member'],
    });

    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    return loan;
  }

  async update(id: string, updateLoanDto: UpdateLoanDto): Promise<Loan> {
    const loan = await this.findOne(id);
    Object.assign(loan, updateLoanDto);
    return this.loansRepository.save(loan);
  }

  async remove(id: string): Promise<void> {
    const loan = await this.findOne(id);
    await this.loansRepository.remove(loan);
  }
} 