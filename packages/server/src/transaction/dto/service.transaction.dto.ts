import { IsNumber } from 'class-validator';

export class ServiceTransactionDto {
  @IsNumber()
  id: number;

}
