import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'get user balance' })
  @ApiParam({
    name: 'Balance data',
    required: true,
    description: 'Balance on user account',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseGuards(JwtAuthGuard)
  async getUsersBalance() {
    return this.userService.getBalance();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':login')
  getMyUser(@Param() params: { login: string }, @Req() req) {
    return this.userService.getMyUser(params.login, req);
  }
}
