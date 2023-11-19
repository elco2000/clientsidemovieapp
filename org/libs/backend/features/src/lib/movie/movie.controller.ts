import { Controller, Delete } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from '@org/backend/dto';
import { Movie } from './movie.schema';

@Controller('movie')
export class MovieController {
    constructor(private movieService: MovieService) {}

    @Get('')
    async getAll(): Promise<Movie[]> {
        return this.movieService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Movie> {
        return this.movieService.getOne(id);
    }

    @Post('')
    async create(@Body() data: CreateMovieDto): Promise<Movie> {
        return this.movieService.create(data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Movie> {
        return this.movieService.delete(id);
    }
}
