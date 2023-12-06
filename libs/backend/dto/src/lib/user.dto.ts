import { IUpdateUser } from "@org/shared/api";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username!: string

    @IsNotEmpty()
    password!: string

    @IsDate()
    @IsNotEmpty()
    birthdate!: Date

    @IsString()
    @IsNotEmpty()
    country!: string

    @IsString()
    @IsOptional()
    description!: string

    @IsString()
    @IsNotEmpty()
    role!: string;
}

export class UpdateUserDto implements IUpdateUser {
    id?: string | undefined;

    @IsString()
    @IsNotEmpty()
    username!: string

    @IsNotEmpty()
    password!: string

    @IsString()
    @IsOptional()
    description!: string
}