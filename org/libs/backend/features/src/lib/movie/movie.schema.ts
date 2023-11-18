import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Genre, Language } from "@org/shared/api";
import { HydratedDocument } from "mongoose";

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
    @Prop()
    title!: string;

    @Prop()
    photo!: Blob;

    @Prop()
    length!: number;

    @Prop()
    releaseDate!: Date;

    @Prop()
    advicedAge!: number;

    @Prop()
    genre!: [Genre]

    @Prop()
    language!: [Language]

    @Prop()
    director!: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);