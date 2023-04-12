import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(dto: UserDto) {
    const { id, balance, login } = dto;
    return this.prisma.user.findMany({
      select: { balance: true, login: true },
      where: { id },
    });
  }

  async getMyUser(id: number, req: Request) {
    const user = this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { user };
  }
}
