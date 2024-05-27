import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateUssdConnDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  // @IsNotEmpty()
  // @IsNumber()
  // public idNumber: number;

  @IsNotEmpty()
  @IsNumber()
  public port: number;

  @IsNotEmpty()
  @IsString()
  public ip: string;
}
