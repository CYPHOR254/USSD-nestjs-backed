import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class ConnectRedisDto {
  @IsNotEmpty()
  @IsString()
  public ip: string;

  @IsNotEmpty()
  @IsNumber()
  public port: number;

  @IsNotEmpty()
  @IsNumber()
  public db: number;

  @IsString()
  @IsOptional()
  public password: string;

  @IsNumber()
  @IsOptional()
  public userId: number;
}
