import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDataDto } from './dto/user-data.dto';
import * as newrelic from 'newrelic'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  enviarInformacion(@Body() userData:UserDataDto){
    const response = this.appService.funcionAtributos(userData);
    newrelic.addCustomAttribute('ResponseMessage',response.message)
    return response
  }
}
