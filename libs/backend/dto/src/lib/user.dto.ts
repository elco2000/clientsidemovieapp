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