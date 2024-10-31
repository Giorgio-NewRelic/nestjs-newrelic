import { Injectable } from '@nestjs/common';
import * as newrelic from 'newrelic'
import { UserDataDto } from './dto/user-data.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  funcionAtributos(userData:UserDataDto) {
    newrelic.addCustomAttributes({
      nombre: userData.nombre,
      apellido: userData.apellido,
      dni: userData.dni,
      marca: userData.marca
    })
    return {
      message: 'Proceso terminado'
    }
  }
}
