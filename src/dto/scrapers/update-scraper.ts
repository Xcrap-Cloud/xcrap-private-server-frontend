import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from "class-validator"
import "reflect-metadata"

export class UpdateScraperDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string

    @IsOptional()
    @IsUrl()
    defaultUrl?: string

    @IsOptional()
    @IsUUID()
    clientId?: string
}
