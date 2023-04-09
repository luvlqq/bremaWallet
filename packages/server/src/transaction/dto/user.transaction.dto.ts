import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class UserTransferDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  senderLogin: string;

  @IsNotEmpty()
  @IsString()
  recipientLogin: string;
}

