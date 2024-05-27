import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }

  @Get('find-all')
  findAll() {
    return this.authService.findAll();
  }

  @Post('create_admin_account')
  createAdminAcc(@Body() dto: RegisterAuthDto) {
    return this.authService.createAdminAcc(dto);
  }

  @Post('signin')
  signin(@Body() dto: LoginAuthDto) {
    return this.authService.signin(dto);
  }

  @Post('forgot_password')
  forgotPass(@Body() payload: Record<string, string>) {
    return this.authService.forgotPassword(payload);
  }

  @Get('refresh')
  refresh(@Headers() headers) {
    return this.authService.refresh(headers);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create_user_account')
  createUserAcc(@Body() dto: RegisterAuthDto) {
    return this.authService.createUserAcc(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change_password')
  changePass(@Body() payload: Record<string, string>) {
    return this.authService.changePassword(payload);
  }

  @Get('signout')
  signout() {
    return this.authService.signout();
  }

  @Put('update-user')
  updateUser(@Body() dto: UpdateUserDto) {
    return this.authService.updateUser(dto);
  }

  @Post('delete-user')
  deleteUser(@Body() payload: any) {
    return this.authService.deleteUser(payload);
  }
}
