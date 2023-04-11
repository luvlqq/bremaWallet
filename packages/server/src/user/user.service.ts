import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(dto: UserDto) {
    const { id, balance } = dto;
    return this.prisma.user.findMany({
      select: { balance: true },
      where: { id },
    });
  }
}
