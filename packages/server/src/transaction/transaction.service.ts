import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { UserTransferDto } from './dto/user.transaction.dto';
import { HistoryTransactionDTO } from './dto/history.transactions.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async transfer(dto: UserTransferDto): Promise<any> {
    try {
      await validateOrReject(dto); // добавляем проверку class-validator
    } catch (errors) {
      throw new HttpException(
        { message: 'Validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { senderLogin, recipientLogin, amount } = dto;
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

  // TODO Написать сервис вывода истории
  // async showBalanceHistory(dto: HistoryTransactionDTO) {
  //   const { login } = dto;
  //   const user = await this.prisma.user.findUnique({
  //     where: { login },
  //     include: {
  //       receivedTransfers: true,
  //       sentTransfers: true,
  //     },
  //   });
  //   const serviceTransfers = await this.prisma.serviceTransfer.findMany();
  //
  //   const result = {
  //     userTransfers: [
  //       ...user.receivedTransfers.map((transfer) => {
  //         return {
  //           id: transfer.id,
  //           amount: transfer.amount,
  //           senderLogin: transfer.senderLogin,
  //           senderUserName: transfer.sender.userName,
  //           recipientLogin: transfer.recipientLogin,
  //           recipientUserName: transfer.recipient.userName,
  //           createdAt: transfer.createdAt,
  //           serviceName: null,
  //         };
  //       }),
  //       ...user.sentTransfers.map((transfer) => {
  //         return {
  //           id: transfer.id,
  //           amount: transfer.amount,
  //           senderLogin: transfer.senderLogin,
  //           senderUserName: transfer.sender.userName,
  //           recipientLogin: transfer.recipientLogin,
  //           recipientUserName: transfer.recipient.userName,
  //           createdAt: transfer.createdAt,
  //           serviceName: null,
  //         };
  //       }),
  //     ],
  //     serviceTransfers: serviceTransfers.map((transfer) => {
  //       return {
  //         id: transfer.id,
  //         serviceName: transfer.serviceName,
  //         createdAt: transfer.createdAt,
  //         senderUserName: null,
  //         recipientUserName: null,
  //         amount: null,
  //       };
  //     }),
  //   };
  //
  //   return result;
  // }
}
