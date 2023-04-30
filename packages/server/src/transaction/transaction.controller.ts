import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserTransferDto } from './dto/user.transaction.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Transaction send' })
  @ApiParam({
    name: 'Transaction send',
    required: true,
    description: 'Send a transaction',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserTransferDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async transfer(@Body() dto: UserTransferDto) {
    try {
      const transfer = await this.transactionService.transfer(dto);
      console.log(transfer);
      return { transfer };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('history/:login')
  async getUserTransfers(@Param('login') login: string, @Req() req) {
    return this.transactionService.getUserTransfers(login, req);
  }
}
