import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUsersBalance(@Param('id') id: number) {
    const userBalance = this.userService.getBalance(id);
    return userBalance;
  }
}
