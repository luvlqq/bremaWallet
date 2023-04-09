import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserTransferDto } from './dto/user.transaction.dto';
import { ServiceTransactionDto } from './dto/service.transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async transfer(
    senderId: number,
    recipientId: number,
    amount: number,
  ): Promise<any> {
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
    });
    const recipient = await this.prisma.user.findUnique({
      where: { id: recipientId },
    });

    if (!sender || !recipient) {
      throw new Error('Invalid sender or recipient ID');
    }

    if (sender.balance < amount) {
      throw new Error('Insufficient balance');
    }

    return this.prisma.$transaction(async (prisma) => {
      const updatedSender = await prisma.user.update({
        where: { id: senderId },
        data: { balance: sender.balance - amount },
      });

      const updatedRecipient = await prisma.user.update({
        where: { id: recipientId },
        data: { balance: recipient.balance + amount },
      });

      const transfer = await prisma.userTransfer.create({
        data: {
          amount,
          sender: { connect: { id: senderId } },
          recipient: { connect: { id: recipientId } },
        },
      });

      return transfer;
    });
  }
}
