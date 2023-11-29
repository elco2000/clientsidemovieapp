import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Actor } from "./actor.schema";
import mongoose, { Model } from "mongoose";
import { CreateActorDto } from "@org/backend/dto";

@Injectable()
export class ActorService {
    TAG = 'ActorService';

    constructor(
        @InjectModel(Actor.name) private actorModel: Model<Actor>,
        ) {}

    async getAll(): Promise<Actor[]> {
        Logger.log('getAll', this.TAG);
        return this.actorModel.find().exec();
    }

    async GetAllForLookup(): Promise<Actor[]> {
        Logger.log('getAllForLookup', this.TAG);
        return this.actorModel.find().select({name: 1}).exec();
    }

    async getOne(id: string): Promise<Actor> {
        Logger.log(`getOne(${id})`, this.TAG);
        try {
            const actor = await this.actorModel.findById(id).exec();
            if (!actor) {
                throw new NotFoundException(`Actor not found for ID: ${id}`);
            }
            return actor;
        } catch (error) {
            Logger.error(`Error fetching actor: ${error}`);
            throw new Error(`Error fetching actor: ${error}`);
        }
    }

    async create(actor: CreateActorDto): Promise<Actor> {
        Logger.log('create', this.TAG);

        const newActor = new this.actorModel(actor);

        newActor._id = new mongoose.Types.ObjectId().toString();

        return newActor.save();
    }

    async edit(actor: Actor): Promise<Actor | null> {
        Logger.log('edit', this.TAG);

        const editedActor = { ...actor };

        try {
            const updatedActor = await this.actorModel.findByIdAndUpdate(editedActor._id, editedActor, { new: true}).exec();

            return updatedActor ?? null;
        } catch (error) {
            Logger.error(`Error editing actor: ${error}`);
            throw new Error(`Error editing actor: ${error}`);
        }
    }

    async delete(id: string): Promise<Actor> {
        Logger.log('delete', this.TAG);
        const actor = await this.actorModel.findByIdAndDelete(id).exec();
        if (!actor) {
            throw new NotFoundException(`Actor not found for ID: ${id}`);
        }

        return actor;
    }
}