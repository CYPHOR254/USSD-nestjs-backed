import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UssdService } from './ussd.service';
import { CreateUssdConnDto } from './dto/create-ussd.dto';
import { UpdateUssdDto } from './dto/update-ussd.dto';
import { ConnectRedisDto } from './dto/connect-redis.dto';
import { CreateRedisDbMngt } from './dto/create-redis-db-mngt.dto';
import { editRedisdbmngt } from './dto/edit-redis-db-mngt.dto';

@Controller('ussd')
export class UssdController {
  constructor(private readonly ussdService: UssdService) {}

  @Post('connect')
  connectToRedis(@Body() connectRedisDto: ConnectRedisDto) {
    return this.ussdService.connectToRedis(connectRedisDto);
  }

  @Post('fetch-ussd-configs')
  listUssdConfigs(@Body() searchString: string) {
    return this.ussdService.listUssdConfigs(searchString);
  }

  @Post('create-new-ussd')
  createNewUssdConfig(@Body() payload: Record<string, string | number>) {
    return this.ussdService.createNewUssdConfig(payload);
  }

  @Post('')
  createRedisdbMngt(@Body() dto: CreateRedisDbMngt) {
    return this.ussdService.createRedisdbMngt(dto);
  }

  // @Post('check-user')
  // checkUserId(@Body() payload) {
  //   return this.ussdService.checkUserId(payload)
  // }

  @Patch('edit-redis-db-mngt')
  editRedisdbmngt(@Body() editredisdto: editRedisdbmngt) {
    return this.ussdService.editRedisdbmngt(editredisdto)
  }

  @Post('list-redis-db-mngt')
  listRedisdbMngt(@Body() payload: any){
    return this.ussdService.listRedisdbMngt(payload);
  }

  @Post('delete-redis-db-mngt')
  deleteRedisdbMngt(@Body() payload: any){
    return this.ussdService.deleteRedisdbMngt(payload)
  }

  @Post('publish-ussd')
  publishUssdConfig(@Body() payload: Record<string, any>) {
    return this.ussdService.publishUssdConfigs(payload);
  }

  @Get('disconnect')
  disconnectFromRedis() {
    return this.ussdService.disconnectFromRedis();
  }

  @Post('create-conn')
  createConn(@Body() dtoUSSD: CreateUssdConnDto) {
    return this.ussdService.createConn(dtoUSSD);
  }

  @Post('list-conn')
  listConn(@Body() payload: Record<string, string>) {
    return this.ussdService.listConn(payload);
  }

  @Put('update-conn')
  updateConn(@Body() dto: UpdateUssdDto) {
    return this.ussdService.updateConn(dto);
  }

  @Post('delete-conn')
  deleteConn(@Body() payload: any) {
    return this.ussdService.deleteConn(payload);
  }

  @Post('fetch-configs')
  async fetchConfigsFromRedis(@Body('appName') appName: string) {
    try {
      const result = await this.ussdService.fetchConfigsFromRedis(appName);
      return { msg: 'success', allData: result };
    } catch (error) {
      throw new Error('Could not fetch configurations');
    }
  }

  @Post('create-hosted-url')
  async createHostedUrl(@Body() payload: Record<string, string>) {
    return this.ussdService.createHostedUrl(payload);
  }

  @Post('list-hosted-urls')
  async listHostedUrls(@Body() payload: Record<string, string>) {
    return this.ussdService.listHostedUrls(payload);
  }

  @Post('edit-hosted-url')
  async editHostedUrl(@Body() payload: Record<string, string>) {
    return this.ussdService.editHostedUrl(payload);
  }

  @Post('delete-hosted-url')
  async deleteHostedUrl(@Body() payload: Record<string, string>) {
    return this.ussdService.deleteHostedUrl(payload);
  }
}
