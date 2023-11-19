import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IMovie } from '@org/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Movie } from './movie.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMovieDto } from '@org/backend/dto';

@Injectable()
export class MovieService {
  TAG = 'MovieService';

  private movies$ = new BehaviorSubject<IMovie[]>([
    {
      id: '0',
      title: 'Test Film',
      photo: '',
      length: 55,
      releaseDate: new Date(),
      advicedAge: 12,
      genre: 'Action',
      language: 'Dutch',
      director: 'Elco Mussert',
    },
  ]);

  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getAll(): Promise<Movie[]> {
    Logger.log('getAll', this.TAG);
    return this.movieModel.find().exec();
  }

  async getOne(id: string): Promise<Movie> {
    Logger.log(`getOne(${id})`, this.TAG);
    try {
      const movie = await this.movieModel.findById(id).exec();
      if (!movie) {
        throw new NotFoundException(`Movie not found for ID: ${id}`);
      }
      return movie;
    } catch (error) {
      Logger.error(`Error fetching movie: ${error}`);
      throw new Error(`Error fetching movie: ${error}`);
    }
  }

  async create(movie: CreateMovieDto): Promise<Movie> {
    Logger.log('create', this.TAG);

    const newMovie = new this.movieModel(movie);

    return newMovie.save();
  }

  async delete(id: string): Promise<Movie> {
    Logger.log('delete', this.TAG);
    const movie = await this.movieModel.findByIdAndDelete(id).exec();
    if (!movie) {
      throw new NotFoundException(`Movie not found for ID: ${id}`);
    }

    return movie;
  }
}
