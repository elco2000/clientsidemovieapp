import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {

    @Prop()
    title!: string;

    @Prop()
    photo!: Buffer;

    @Prop()
    length!: number;

    @Prop()
    releaseDate!: Date;

    @Prop()
    advicedAge!: number;

    @Prop()
    genre!: string

    @Prop()
    language!: string

    @Prop()
    director!: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);