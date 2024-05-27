import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateRedisDbMngt  {
    
    @IsNumber()
    public userId: number

    @IsNotEmpty()
    @IsNumber()
    public port: number
    
    @IsNotEmpty()
    @IsString()
    public ip: string

    @IsNumber()   
    public db: number

    @IsNotEmpty()
    @IsArray()
    @IsOptional()
    public allowedUsers?: string[]
}