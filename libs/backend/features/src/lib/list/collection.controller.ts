/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Param, Post, UseGuards, Request, Put, Delete, Get } from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "@org/backend/dto";
import { ICollection } from "@org/shared/api";
import { AuthGuard } from "@org/backend/auth";

@Controller('collection')
export class CollectionController {
    constructor(private collectionService: CollectionService) {}

    @Get('user/:id')
    @UseGuards(AuthGuard)
    async getAllByUser(@Param('id') id: string): Promise<ICollection[]> {
        return this.collectionService.getAllByUser(id);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getOne(@Param('id') id: string): Promise<ICollection> {
        return this.collectionService.getOne(id);
    }

    @Get('without/:id')
    @UseGuards(AuthGuard)
    async getListsWithoutMovie(@Param('id') id: string): Promise<ICollection[]> {
        return this.collectionService.getListsWithoutMovie(id);
    }

    @Get(':id/movies')
    @UseGuards(AuthGuard)
    async getMovieIdsOfCollection(@Param('id') id: string): Promise<string[]> {
        return this.collectionService.getMovieIdsOfCollection(id);
    }

    @Post('')
    @UseGuards(AuthGuard)
    async create(@Body() data: CreateCollectionDto): Promise<ICollection> {
        return this.collectionService.create(data);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async update(@Param('id') id: string, @Request() req: any): Promise<ICollection | null> {
        return this.collectionService.update(id, req);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete (@Param('id') id: string): Promise<string> {
        return this.collectionService.delete(id);
    }

    @Put('movies/add')
    @UseGuards(AuthGuard)
    async addToCollection(@Request() req: any): Promise<string> {
        return this.collectionService.addToCollection(req);
    }

    @Put('movies/remove')
    @UseGuards(AuthGuard)
    async removeFromCollection(@Request() req: any): Promise<string> {
        return this.collectionService.RemoveFromCollection(req);
    }
}