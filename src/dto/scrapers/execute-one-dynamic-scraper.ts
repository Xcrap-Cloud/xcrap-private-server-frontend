import { IsEnum, IsOptional, IsUUID, ValidateNested, IsString, IsBoolean, IsUrl, ValidateIf } from "class-validator"
import { Type } from "class-transformer"
import "reflect-metadata"

import { IsQueryRequiredIfNested } from "@/decorators/scrapers/is-query-required-if-nested.decorator"
import { IsRecordOfParsingField } from "@/decorators/scrapers/is-record-of-parsing-field.decorator"
import { ParsingModelFieldType } from "@/enums/scrapers/parsing-model-field-type"
import { ClientType } from "../../enums/clients/client-type"

class CreateDynamicModelDto {
    [key: string]: CreateParsingModelFieldDto
}

export class CreateParsingModelDto {
    @IsEnum(ParsingModelFieldType)
    type: ParsingModelFieldType

    @IsRecordOfParsingField({
        message: "model must be a Record<string, CreateParsingModelFieldDto>",
    })
    model: CreateDynamicModelDto
}

export class CreateParsingModelFieldDto {
    @IsOptional()
    @IsString()
    @IsQueryRequiredIfNested("nested", {
        message: "`query` is required when `nested` is present.",
    })
    query?: string

    @IsOptional()
    @IsString()
    extractor?: string

    @IsOptional()
    @IsBoolean()
    multiple?: boolean

    @IsOptional()
    default?: any

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateParsingModelDto)
    nested?: CreateParsingModelDto
}

export class CreateRequestConfigDto {
    @IsOptional()
    @IsString()
    method?: string

    @IsOptional()
    @IsString()
    userAgent?: string
}

export class DynamicClientDto {
    @IsEnum(ClientType)
    type: ClientType
}

export class ExecuteOneDynamicScraperDto {
    @IsUrl()
    url: string

    @ValidateIf((object) => object.client === undefined || object.client === null, {
        message: "Client ID is required if Client is not provided.",
    })
    @IsUUID()
    clientId?: string

    @ValidateIf((object) => object.clientId === undefined || object.clientId === null, {
        message: "Client is required if clientId is not provided.",
    })
    @ValidateNested()
    @Type(() => DynamicClientDto)
    client?: DynamicClientDto

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateParsingModelDto)
    parsingModel?: CreateParsingModelDto

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateRequestConfigDto)
    requestConfig?: CreateRequestConfigDto
}
