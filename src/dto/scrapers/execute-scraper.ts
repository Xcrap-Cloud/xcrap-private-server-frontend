import { IsOptional, IsUrl } from "class-validator"

export class ExecuteScraperDto {
    @IsOptional()
    @IsUrl()
    url?: string
}
