import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UssdModule } from './ussd/ussd.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, UssdModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
