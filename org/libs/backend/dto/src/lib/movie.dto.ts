import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDate,
    IsNumber,
    IsArray
} from 'class-validator';
import {
    ICreateMovie,
    IUpdateMovie,
    Genre,
    Language
} from '@org/shared/api';

export class CreateMovieDto implements ICreateMovie {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsNotEmpty()
    photo!: Blob;

    @IsNumber()
    @IsNotEmpty()
    length!: number;

    @IsDate()
    @IsOptional()
    releaseDate!: Date;

    @IsNumber()
    @IsNotEmpty()
    advicedAge!: number;

    @IsArray()
    @IsNotEmpty()
    genre!: [Genre];

    @IsArray()
    @IsNotEmpty()
    language!: [Language];

    @IsString()
    @IsNotEmpty()
    director!: string;
}

export class UpdateMovieDto implements IUpdateMovie {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsNotEmpty()
    photo!: Blob;

    @IsNumber()
    @IsNotEmpty()
    length!: number;

    @IsDate()
    @IsOptional()
    releaseDate!: Date;

    @IsNumber()
    @IsNotEmpty()
    advicedAge!: number;

    @IsArray()
    @IsNotEmpty()
    genre!: [Genre];

    @IsArray()
    @IsNotEmpty()
    language!: [Language];

    @IsString()
    @IsNotEmpty()
    director!: string;
}