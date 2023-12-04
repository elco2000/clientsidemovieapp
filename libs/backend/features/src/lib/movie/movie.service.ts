import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Movie } from './movie.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMovieDto } from '@org/backend/dto';

@Injectable()
export class MovieService {
  TAG = 'MovieService';

  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getAll(): Promise<Movie[]> {
    Logger.log('getAll', this.TAG);
    return this.movieModel.find().exec();
  }

  async getSmallInformationByActorId(id: string): Promise<Movie[]> {
    Logger.log(`getSmallInformationByActorId(${id})`, this.TAG);
    return this.movieModel.find({ actors: id}).select({title: 1, photo: 1}).exec();
  }

  async getOne(id: string): Promise<Movie> {
    Logger.log(`getOne(${id})`, this.TAG);
    try {
      const movie = await this.movieModel
        .findById(id)
        .populate('actors')
        .exec();
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

    newMovie._id = new mongoose.Types.ObjectId().toString();

    return newMovie.save();
  }

  async edit(movie: Movie): Promise<Movie | null> {
    Logger.log('edit', this.TAG);

    const editedMovie = { ...movie };

    try {
      const updatedMovie = await this.movieModel
        .findByIdAndUpdate(editedMovie._id, editedMovie, { new: true })
        .exec();

      return updatedMovie ?? null;
    } catch (error) {
      Logger.error(`Error editing movie: ${error}`);
      throw new Error(`Error editing movie: ${error}`);
    }
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
