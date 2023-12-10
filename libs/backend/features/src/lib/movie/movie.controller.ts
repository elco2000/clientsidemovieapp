import { Controller, Delete, Put, UseGuards } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from '@org/backend/dto';
import { Movie } from './movie.schema';
import { AuthGuard } from '@org/backend/auth';

@Controller('movie')
export class MovieController {
    constructor(private movieService: MovieService) {}

    @Get('')
    async getAll(): Promise<Movie[]> {
        return this.movieService.getAll();
    }

    @Get('actor/:id')
    async getSmallInformationByActorId(@Param('id') id: string): Promise<Movie[]> {
        return this.movieService.getSmallInformationByActorId(id);
    }

    @Put('collection')
    async getMoviesByIds(@Body() data: string[]): Promise<Movie[]> {
        return this.movieService.getMoviesByIds(data);
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Movie> {
        return this.movieService.getOne(id);
    }

    @Post('')
    @UseGuards(AuthGuard)
    async create(@Body() data: CreateMovieDto): Promise<Movie> {
        return this.movieService.create(data);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async update(@Body() data: Movie): Promise<Movie | null> {
        return this.movieService.edit(data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string): Promise<Movie> {
        return this.movieService.delete(id);
    }
}
