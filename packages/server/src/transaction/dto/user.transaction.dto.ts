import { IsNumber } from 'class-validator';

export class UserTransactionDto {
  @IsNumber()
  id: number;
}
