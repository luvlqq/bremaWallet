import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance() {
    return this.prisma.user.findMany({
      select: { id: true, balance: true, login: true },
    });
  }

  async getMyUser(login: string, req: Request) {
    const decodedUser = req.user as { login: string };
    const foundUser = await this.prisma.user.findUnique({ where: { login } });
    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.login !== decodedUser.login) {
      throw new ForbiddenException();
    }

    delete foundUser.hashedPassword;
    delete foundUser.createdAt;
    delete foundUser.userName;

    return { user: foundUser };
  }
}
