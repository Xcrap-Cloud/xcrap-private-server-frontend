import { IsEnum, IsString } from "class-validator"

import { ClientType } from "../../enums/clients/client-type"

export class CreateClientDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsEnum(ClientType)
    type: ClientType
}
