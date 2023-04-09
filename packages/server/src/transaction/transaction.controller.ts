import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async transfer(
    @Body('senderLogin') senderLogin: string,
    @Body('recipientLogin') recipientLogin: string,
    @Body('amount') amount: number,
  ) {
    const transfer = await this.transactionService.transfer(
      senderLogin,
      recipientLogin,
      amount,
    );
    return { transfer };
  }
}
