import { Controller } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { MovieService } from './movie.service';
import { IMovie } from '@org/shared/api';
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
    getOne(@Param('id') id: string): IMovie {
        return this.movieService.getOne(id);
    }

    @Post('')
    async create(@Body() data: CreateMovieDto): Promise<Movie> {
        return this.movieService.create(data);
    }
}
