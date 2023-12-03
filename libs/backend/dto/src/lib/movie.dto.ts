import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDate,
    IsNumber,
    IsArray,
} from 'class-validator';
import {
    ICreateMovie,
    IUpdateMovie,
} from '@org/shared/api';

export class CreateMovieDto implements ICreateMovie {

    constructor(data: Partial<CreateMovieDto>) { Object.assign(this, data) }

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsNotEmpty()
    photo!: string;

    @IsNumber()
    @IsNotEmpty()
    length!: number;

    @IsDate()
    @IsOptional()
    releaseDate!: Date;

    @IsNumber()
    @IsNotEmpty()
    advicedAge!: number;

    @IsString()
    @IsNotEmpty()
    genre!: string;

    @IsString()
    @IsNotEmpty()
    language!: string;

    @IsString()
    @IsNotEmpty()
    director!: string;

    @IsArray()
    @IsNotEmpty()
    actors!: string[];
}

export class UpdateMovieDto implements IUpdateMovie {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsNotEmpty()
    photo!: string;

    @IsNumber()
    @IsNotEmpty()
    length!: number;

    @IsDate()
    @IsOptional()
    releaseDate!: Date;

    @IsNumber()
    @IsNotEmpty()
    advicedAge!: number;

    @IsString()
    @IsNotEmpty()
    genre!: string;

    @IsString()
    @IsNotEmpty()
    language!: string;

    @IsString()
    @IsNotEmpty()
    director!: string;

    @IsArray()
    @IsNotEmpty()
    actors!: string[];
}