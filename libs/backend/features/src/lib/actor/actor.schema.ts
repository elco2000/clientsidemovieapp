import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ActorDocument = HydratedDocument<Actor>;

@Schema()
export class Actor {

    @Prop({type: mongoose.Schema.Types.ObjectId})
    _id!: string;

    @Prop()
    name!: string;

    @Prop()
    birthdate!: Date;

    @Prop()
    nationality!: string;

    @Prop()
    photo!: string;
}

export const ActorSchema = SchemaFactory.createForClass(Actor);
