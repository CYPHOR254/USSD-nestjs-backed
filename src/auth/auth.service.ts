import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { MailerService } from '@nestjs-modules/mailer';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailService: MailerService,
  ) {}

  async createAdminAcc(dto: RegisterAuthDto) {
    const { email, password, phoneNumber, idNumber } = dto;

    const existingUser = await this.prisma.sys_users.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    await this.prisma.sys_users.create({
      data: {
        email: email.toLowerCase(),
        hashedPassword,
        idNumber,
        phoneNumber,
        userType: 'SYS_ADMIN',
        status: true,
        loginTrials: 3,
        lastLogin: new Date('0000-00-00'),
      },
    });

    return {
      message: 'Created new System Admin',
      respCode: '00',
    };
  }

  async createUserAcc(dto: RegisterAuthDto) {
    const { email, password, phoneNumber, idNumber, userId } = dto;

    const existingUser = await this.prisma.sys_users.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    await this.prisma.sys_users.create({
      data: {
        email: email.toLowerCase(),
        hashedPassword,
        idNumber,
        phoneNumber,
        userType: 'USER',
        status: true,
        loginTrials: 3,
        lastLogin: new Date('0000-00-00'),
        createdBy: userId,
      },
    });

    return {
      message: 'Created new User',
      respCode: '00',
    };
  }

  async findAll() {
    const users = await this.prisma.sys_users.findMany();
    const temp = users.map((user) => ({
      ...user,
      phoneNumber: user.phoneNumber.toString(), // Convert `phoneNumber` to string
    }));

    return {
      listUsers: temp,
      message: 'Success',
      respCode: '00',
    };
  }

  async signin(dto: LoginAuthDto) {
    const { email, password } = dto;

    const existingUser = await this.prisma.sys_users.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new BadRequestException(
        `User with provided email: ${email}, does not exist`,
      );
    }

    if (existingUser.loginTrials == 0 || existingUser.status == false) {
      await this.prisma.sys_users.update({
        where: { email },
        data: {
          status: false,
          isBlocked: true
        },
      });

      throw new BadRequestException(
        'Login attempts exceeded. Contact System Admin',
      );
    }

    if (existingUser.isBlocked == true) {
      await this.prisma.sys_users.update({
        where: { email },
        data: {
          isBlocked: true,
        },
      });

      throw new BadRequestException(
        'User has been blocked. Contact System Admin',
      );
    }

    const passwordsMatch = await this.comparePasswords({
      password,
      hash: existingUser.hashedPassword,
    });

    const currentLoginTrials = existingUser.loginTrials;

    if (!passwordsMatch) {
      await this.prisma.sys_users.update({
        where: { email },
        data: {
          loginTrials: currentLoginTrials - 1,
        },
      });
      throw new UnauthorizedException({
        remainingTrials: currentLoginTrials - 1,
        message: 'Invalid credentials',
      });
    }

    await this.prisma.sys_users.update({
      where: { email },
      data: {
        lastLogin: new Date(),
        loginTrials: 3,
      },
    });

    const tokenObject = await this.signToken({
      id: existingUser.id,
      email: existingUser.email,
      idNumber: existingUser.idNumber,
      userType: existingUser.userType,
    });

    return {
      message: 'Signed in successfully',
      respCode: '00',
      token: tokenObject.token,
      refreshToken: tokenObject.refreshToken,
      firstTimeLogin: existingUser.firstTimeLogin,
      userType: existingUser.userType,
      id: existingUser.id,
    };
  }

  async refresh(headers: Headers) {
    const refToken = headers['authorization'].split(' ')[1];

    const response = await this.verifyRefreshToken(refToken);

    const payload = {
      id: response.id,
      email: response.email,
      idNumber: response.idNumber,
      userType: response.userType,
    };

    if (!response.id) {
      throw new BadRequestException('Refresh Token invalid');
    }

    const tokenObject = await this.signToken(payload);

    return {
      message: 'Token refreshed',
      respCode: '00',
      token: tokenObject.token,
      refreshToken: tokenObject.refreshToken,
    };
  }

  async signout() {
    return {
      mess: 'Signed out',
    };
  }

  async forgotPassword(payload: Record<string, string>) {
    try {
      const existingUser = await this.prisma.sys_users.findUnique({
        where: { email: payload['email'] },
      });

      if (!existingUser) {
        throw new BadRequestException(
          `User with provided email: ${payload['email']}, does not exist`,
        );
      }

      if (existingUser.loginTrials == 0 || existingUser.status == false) {
        await this.prisma.sys_users.update({
          where: { email: payload['email'] },
          data: {
            status: false,
          },
        });

        throw new BadRequestException(
          'Login attempts exceeded OR Status is inactive. Contact System Admin',
        );
      }

      if (existingUser.isBlocked == true) {
        await this.prisma.sys_users.update({
          where: { email: payload['email'] },
          data: {
            isBlocked: true,
          },
        });

        throw new BadRequestException(
          'User has been blocked. Contact System Admin',
        );
      }

      const randomPass = randomUUID();
      const hashedPassword = await this.hashPassword(randomPass);
      await this.prisma.sys_users.update({
        where: { email: payload['email'] },
        data: {
          hashedPassword,
        },
      });

      const emailTemplate = `
      Please login with the credentials below:
      email: ${payload['email']}
      password: ${randomPass}
  
      URL: http://localhost:4200/
      `;

      const response = await this.mailService.sendMail({
        to: payload['email'],
        from: 'support@ussdconfig.com',
        subject: 'Forgot Password for the USSD Portal',
        text: emailTemplate,
      });

      if (response) {
        return {
          message:
            'Password reset successfully. A new password has been sent to the provided email',
          respCode: '00',
        };
      } else {
        throw new BadRequestException('Mail could not be sent.');
      }
    } catch (error) {
      return error;
    }
  }

  async changePassword(payload: Record<string, string>) {
    console.log(payload);

    const existingUser = await this.prisma.sys_users.findUnique({
      where: { email: payload['email'] },
    });

    if (!existingUser) {
      throw new BadRequestException(
        `User with provided email: ${payload['email']}, does not exist`,
      );
    }

    if (existingUser.loginTrials == 0 || existingUser.status === false) {
      await this.prisma.sys_users.update({
        where: { email: payload['email'] },
        data: {
          status: false,
        },
      });

      throw new BadRequestException(
        'Login attempts exceeded OR Account Status is inactive. Contact System Admin',
      );
    }

    if (existingUser.isBlocked == true) {
      await this.prisma.sys_users.update({
        where: { email: payload['email'] },
        data: {
          isBlocked: true,
        },
      });

      throw new BadRequestException(
        'User has been blocked. Contact System Admin',
      );
    }

    const hashedPassword = await this.hashPassword(payload['password']);
    await this.prisma.sys_users.update({
      where: { email: payload['email'] },
      data: {
        hashedPassword,
        firstTimeLogin: false,
      },
    });

    return {
      message: 'Password changed successfully.',
      respCode: '00',
    };
  }

  async updateUser(dto: UpdateUserDto) {
    const { id } = dto;

    try {
      await this.prisma.sys_users.update({
        where: { id },
        data: {
          email: dto.email,
          idNumber: dto.idNumber,
          phoneNumber: dto.phoneNumber,
          isBlocked: dto.isBlocked,
        },
      });
      return {
        message: 'User updated successfully',
        respCode: '00',
      };
    } catch (error) {
      return { message: `Could not update user: ${error.message}` };
    }
  }

  async deleteUser(payload: any) {
    const { id } = payload;

    await this.prisma.sys_users.delete({
      where: { id: id },
    });

    return {
      message: 'User deleted successfully',
      respCode: '00',
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePasswords(args: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: {
    id: number;
    email: string;
    idNumber: number;
    userType: string;
  }) {
    const payload = args;

    const [token, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '20m',
      }),
      this.jwt.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '25m',
      }),
    ]);

    return { token, refreshToken };
  }

  async verifyRefreshToken(refToken: string) {
    const refreshTokenValid = await this.jwt.verifyAsync(refToken.toString(), {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return refreshTokenValid;
  }
}
