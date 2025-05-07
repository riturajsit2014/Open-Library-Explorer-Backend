import { Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LoansService } from '../modules/loans/loans.service';
import { CreateLoanDto } from '../modules/loans/dto/create-loan.dto';
import { UpdateLoanDto } from '../modules/loans/dto/update-loan.dto';

@Injectable()
export class LoanGrpcService {
  constructor(private readonly loansService: LoansService) {}

  @GrpcMethod('LoanService', 'CreateLoan')
  async createLoan(data: CreateLoanDto) {
    return this.loansService.create(data);
  }

  @GrpcMethod('LoanService', 'GetLoan')
  async getLoan(data: { id: string }) {
    return this.loansService.findOne(data.id);
  }

  @GrpcMethod('LoanService', 'ListLoans')
  async listLoans(data: { page: number; limit: number; member_id?: string; book_id?: string; status?: string }) {
    const options = {
      page: data.page || 1,
      limit: data.limit || 10,
    };
    const baseUrl = '/loans'; // This is a placeholder, adjust as needed
    const result = await this.loansService.findAll(options, baseUrl);
    return {
      loans: result.items,
      total: result.meta.totalItems,
      page: result.meta.currentPage,
      limit: result.meta.itemsPerPage,
    };
  }

  @GrpcMethod('LoanService', 'UpdateLoan')
  async updateLoan(data: UpdateLoanDto) {
    const { id, ...updateData } = data;
    const updateDto = new UpdateLoanDto();
    updateDto.id = id;
    Object.assign(updateDto, updateData);
    return this.loansService.update(id, updateDto);
  }

  @GrpcMethod('LoanService', 'DeleteLoan')
  async deleteLoan(data: { id: string }) {
    await this.loansService.remove(data.id);
    return {};
  }
} 