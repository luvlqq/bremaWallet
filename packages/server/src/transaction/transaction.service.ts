import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { UserTransferDto } from './dto/user.transaction.dto';
import { HistoryTransactionDTO } from './dto/history.transactions.dto';
import { omit } from 'lodash';
import { Request } from 'express';
import { UserTransfer } from '@prisma/client';
import { MapUserDto } from './dto/mapUser.dto';

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
  async getUserTransfers(
    login: string,
    req: Request,
  ): Promise<HistoryTransactionDTO> {
    const decodedUser = req.user as { login: string };
    const user = await this.prisma.user.findUnique({
      where: { login },
      include: {
        sentTransfers: {
          include: { recipient: true },
        },
        receivedTransfers: {
          include: { sender: true },
        },
      },
    });

    if (user.login !== decodedUser.login) {
      throw new ForbiddenException();
    }

    const sentTransfers = user.sentTransfers.map((transfer) =>
      this.mapUserTransferToDto(omit(transfer, ['sender', 'senderLogin'])),
    );
    const receivedTransfers = user.receivedTransfers.map((transfer) =>
      this.mapUserTransferToDto(
        omit(transfer, ['recipient', 'recipientLogin']),
      ),
    );

    return {
      sentTransfers,
      receivedTransfers,
    };
  }

  private mapUserTransferToDto(userTransfer: UserTransfer): MapUserDto {
    return {
      id: userTransfer.id,
      amount: userTransfer.amount,
      senderLogin: userTransfer.senderLogin,
      recipientLogin: userTransfer.recipientLogin,
      createdAt: userTransfer.createdAt,
    };
  }
}
