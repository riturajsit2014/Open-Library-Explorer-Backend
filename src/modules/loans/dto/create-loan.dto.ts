import { IsString, IsDateString } from 'class-validator';

export class CreateLoanDto {
  @IsString()
  book_id: string;

  @IsString()
  member_id: string;

  @IsDateString()
  loan_date: string;

  @IsDateString()
  due_date: string;
} 