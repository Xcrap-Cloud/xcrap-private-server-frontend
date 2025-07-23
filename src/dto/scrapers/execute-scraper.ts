import { IsOptional, IsUrl } from "class-validator"
import "reflect-metadata"

export class ExecuteScraperDto {
    @IsOptional()
    @IsUrl()
    url?: string
}
