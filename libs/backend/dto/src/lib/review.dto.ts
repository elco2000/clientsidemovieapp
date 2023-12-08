import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    text!: string;

    @IsNumber()
    @IsNotEmpty()
    rating!: number;

    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsString()
    @IsNotEmpty()
    movieId!: string;
}

export class UpdateReviewDto {
    id?: string | undefined;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    text!: string;

    @IsNumber()
    @IsNotEmpty()
    rating!: number

    @IsString()
    @IsNotEmpty()
    userId!: string;
}