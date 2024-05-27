import {
  Length,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsNumber()
  // @Length(10, 13, {
  //   message: 'Phone Number must be between 10 and 13 characters',
  // })
  public phoneNumber: number;

  @IsNotEmpty()
  @IsNumber()
  public idNumber: number;

  @IsNumber()
  public id: number;

  @IsBoolean()
  public isBlocked: boolean;
}
