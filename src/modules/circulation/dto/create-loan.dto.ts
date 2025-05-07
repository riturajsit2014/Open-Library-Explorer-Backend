import { IsString, IsDateString } from 'class-validator';

export class CreateLoanDto {
  @IsString()
  memberId: string;

  @IsString()
  bookCopyId: string;

  @IsDateString()
  dueDate: string;
} 