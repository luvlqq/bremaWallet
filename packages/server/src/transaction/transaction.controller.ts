import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async transfer(
    @Body('senderId') senderId: number,
    @Body('recipientId') recipientId: number,
    @Body('amount') amount: number,
  ) {
    const transfer = await this.transactionService.transfer(
      senderId,
      recipientId,
      amount,
    );
    return { transfer };
  }
}
