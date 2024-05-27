import { PartialType } from '@nestjs/mapped-types';
import { CreateUssdConnDto } from './create-ussd.dto';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUssdDto extends PartialType(CreateUssdConnDto) {
  @IsNotEmpty()
  @IsNumber()
  public port: number;

  @IsNotEmpty()
  @IsString()
  public ip: string;

  @IsNumber()
  public id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;
}
