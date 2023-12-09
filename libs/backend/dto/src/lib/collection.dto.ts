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
    privateCollection!: string

    @IsString()
    @IsNotEmpty()
    userId!: string
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
    privateCollection!: string

    @IsString()
    @IsNotEmpty()
    userId!: string
}

export class EditCollectionMovie {
    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsString()
    @IsNotEmpty()
    movieId!: string;

    @IsString()
    @IsNotEmpty()
    collectionId!: string;
}