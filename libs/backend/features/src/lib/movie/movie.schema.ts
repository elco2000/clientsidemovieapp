import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {

    @Prop({type: mongoose.Schema.Types.ObjectId})
    _id!: string;

    @Prop()
    title!: string;

    @Prop()
    photo!: string;

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