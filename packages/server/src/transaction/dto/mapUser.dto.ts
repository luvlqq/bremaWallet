import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class MapUserDto {
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

  @IsNotEmpty()
  id: number;

  @Type(() => Date)
  createdAt: Date;
}
