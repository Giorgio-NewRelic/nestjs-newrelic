import { IsNumber, IsString } from "class-validator";

export class UserDataDto {
    @IsString()
    nombre: string

    @IsString()
    apellido:string

    @IsNumber()
    dni:number

    @IsString()
    marca:string
}