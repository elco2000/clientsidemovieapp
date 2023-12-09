import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCollectionDto {
    @IsString()
    @IsNotEmpty()
    name!: string

    @IsString()
    @IsNotEmpty()
    description!: string

    @IsBoolean()
    @IsNotEmpty()
    private!: string
}

export class EditCollectionDto {
    id?: string | undefined;

    @IsString()
    @IsNotEmpty()
    name!: string

    @IsString()
    @IsNotEmpty()
    description!: string

    @IsBoolean()
    @IsNotEmpty()
    private!: string
}