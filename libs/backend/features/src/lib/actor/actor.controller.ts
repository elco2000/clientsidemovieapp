import { CreateActorDto } from "@org/backend/dto";
import { ActorService } from "./actor.service";
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Actor } from "./actor.schema";
import { AuthGuard } from "@org/backend/auth";

@Controller('actor')
export class ActorController {
    constructor(private actorService: ActorService) {}

    @Get('')
    async getAll(): Promise<Actor[]> {
        return this.actorService.getAll();
    }
    
    @Get('lookup')
    async getAllForLookup(): Promise<Actor[]> {
        return this.actorService.GetAllForLookup();
    }


    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Actor> {
        return this.actorService.getOne(id);
    }
    
    @Post('')
    @UseGuards(AuthGuard)
    async create(@Body() data: CreateActorDto): Promise<Actor> {
        return this.actorService.create(data);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async update(@Body() data: Actor): Promise<Actor | null> {
        return this.actorService.edit(data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string): Promise<Actor> {
        return this.actorService.delete(id);
    }
}