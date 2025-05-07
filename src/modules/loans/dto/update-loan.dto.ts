import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateLoanDto {
  @IsString()
  id: string;

  @IsDateString()
  @IsOptional()
  return_date?: string;

  @IsString()
  @IsOptional()
  status?: string;
} 