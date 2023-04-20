import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register an account' })
  @ApiParam({
    name: 'RegisterData',
    required: true,
    description: 'Account register',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AuthDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'login in account' })
  @ApiParam({
    name: 'Login data',
    required: true,
    description: 'login in account',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AuthDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async login(@Request() req, @Response() res, @Body() dto: AuthDto) {
    return this.authService.login(dto, req, res);
  }

  @Get('signout')
  @ApiOperation({ summary: 'sign-out on account' })
  @ApiParam({
    name: 'sign-out data',
    required: true,
    description: 'sign-out on account',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async signout(@Request() req, @Response() res) {
    return this.authService.signout(req, res);
  }
}
