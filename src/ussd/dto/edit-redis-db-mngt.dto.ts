import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateRedisDbMngt } from "./create-redis-db-mngt.dto";

export class editRedisdbmngt extends PartialType(CreateRedisDbMngt){

    @IsNumber()
    public id: number;

}