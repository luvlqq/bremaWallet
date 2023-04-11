import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'get user balance' })
  @ApiParam({
    name: 'Balance data',
    required: true,
    description: 'Balance on user account',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getUsersBalance(@Param('id') id: number) {
    return this.userService.getBalance(id);
  }
}
