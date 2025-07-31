import { IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

import { UserRole } from "@/enums/users/role"
import configHelper from "@/helpers/config"
import regexHelper from "@/helpers/regex"

export class CreateUserDto {
    @IsString()
    @MinLength(configHelper.users.minNameLength)
    @MaxLength(configHelper.users.maxNameLength)
    name: string

    @IsString()
    @MinLength(configHelper.users.minUsernameLength)
    @MaxLength(configHelper.users.maxUsernameLength)
    username: string

    @IsEmail()
    @MaxLength(configHelper.users.maxEmailLength)
    email: string

    @Matches(regexHelper.password)
    password: string

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole
}
