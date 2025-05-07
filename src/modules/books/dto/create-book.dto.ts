import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  isbn: string;

  @IsString()
  publisher: string;

  @IsInt()
  publication_year: number;

  @IsString()
  genre: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  total_copies: number;

  @IsString()
  location: string;
} 