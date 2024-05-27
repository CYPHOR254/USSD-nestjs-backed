import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { RegisterAuthDto } from './register-auth.dto';

export class LoginAuthDto extends PartialType(RegisterAuthDto) {
  @Exclude()
  public phoneNumber: number;

  @Exclude()
  public idNumber: number;
}
