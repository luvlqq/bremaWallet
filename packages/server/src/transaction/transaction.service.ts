import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async transfer(
    senderLogin: string,
    recipientLogin: string,
    amount: number,
  ): Promise<any> {
    const sender = await this.prisma.user.findUnique({
      where: { login: senderLogin },
    });
    const recipient = await this.prisma.user.findUnique({
      where: { login: recipientLogin },
    });

    if (!sender || !recipient) {
      throw new BadRequestException('Invalid sender or recipient login');
    }

    if (sender.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    return this.prisma.$transaction(async (prisma) => {
      const updatedSender = await prisma.user.update({
        where: { login: senderLogin },
        data: { balance: sender.balance - amount },
      });

      const updatedRecipient = await prisma.user.update({
        where: { login: recipientLogin },
        data: { balance: recipient.balance + amount },
      });

      const transfer = await prisma.userTransfer.create({
        data: {
          amount,
          sender: { connect: { login: senderLogin } },
          recipient: { connect: { login: recipientLogin } },
        },
      });

      return transfer;
    });
  }
}
