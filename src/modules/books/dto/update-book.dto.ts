import { IsString } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends CreateBookDto {
  @IsString()
  id: string;
} 