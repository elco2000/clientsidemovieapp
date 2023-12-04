import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Actor } from "../actor/actor.schema";

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

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }] })
    actors!: Actor[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);