import { IsEnum, IsOptional, IsString } from "class-validator"
import "reflect-metadata"

import { ClientType } from "@/enums/clients/client-type"

export class UpdateClientDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsEnum(ClientType)
    type?: ClientType
}
