import { AuthDto } from './dto/auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const { login, password } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { login },
    });
    if (foundUser) {
      throw new BadRequestException('login already exist!');
    }

    const hashedPassword: string = await this.hashPassword(password);
    await this.prisma.user.create({ data: { login, hashedPassword } });

    return { message: 'register was successful' };
  }

  async login(dto: AuthDto, req: Request, res: Response) {
    const { login, password } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { login },
    });
    if (!foundUser) {
      throw new BadRequestException('User are not exist!');
    }
    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });
    if (!isMatch) {
      throw new BadRequestException('Password doesnt match!');
    }

    const token = await this.signToken({ login: foundUser.login });
    if (!token) {
      throw new ForbiddenException('');
    }

    res.cookie('token', token);

    return res.send({ message: 'Logged in successful' });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logged out successful' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { login: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
