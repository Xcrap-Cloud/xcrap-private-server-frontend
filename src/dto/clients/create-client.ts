import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import "reflect-metadata"

import { Transform } from "class-transformer"

import { ClientType } from "@/enums/clients/client-type"

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => (value === "" ? undefined : value))
    description: string

    @IsEnum(ClientType)
    type: ClientType
}
