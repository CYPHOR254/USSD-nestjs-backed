import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getAllUsers() {
    return this.prisma.sys_users.findMany({
      select: {
        id: true,
        idNumber: true,
        email: true,
        phoneNumber: true,
        userType: true,
        status: true,
      },
    });
  }
}
