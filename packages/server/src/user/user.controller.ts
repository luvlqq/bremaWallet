import {Controller, Get, HttpStatus, Param, Req, UseGuards} from '@nestjs/common';
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
  async getUsersBalance(@Param() dto: UserDto) {
    return this.userService.getBalance(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: { id: number }, @Req() req) {
    return this.userService.getMyUser(params.id, req);
  }
}
