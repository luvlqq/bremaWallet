import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserTransactionDto } from './dto/user.transaction.dto';
import { ServiceTransactionDto } from './dto/service.transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  transferBetweenUsers(dto: UserTransactionDto) {
    const { id } = dto;

  }

  transferToService(dto: ServiceTransactionDto) {}
}
