import {
  Length,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 40, {
    message: 'Password must be between 8 and 40 characters',
  })
  public password: string;

  @IsNotEmpty()
  @IsNumber()
  // @Length(10, 13, {
  //   message: 'Phone Number must be between 10 and 13 characters',
  // })
  public phoneNumber: number;

  @IsNotEmpty()
  @IsNumber()
  public idNumber: number;

  @IsOptional()
  @IsNumber()
  public userId?: number;
}
