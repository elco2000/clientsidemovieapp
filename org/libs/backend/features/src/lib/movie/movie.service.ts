import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IMovie } from "@org/shared/api";
import { BehaviorSubject } from "rxjs";
import { Movie } from "./movie.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateMovieDto } from "@org/backend/dto";

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
            director: 'Elco Mussert'
        }
    ]);

    constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

    async getAll(): Promise<Movie[]>  {
        Logger.log('getAll', this.TAG);
        return this.movieModel.find().exec();
    }

    getOne(id: string): IMovie {
        Logger.log(`getOne(${id})`, this.TAG);
        const movie = this.movies$.value.find((td) => td.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie could not be found!`);
        }
        return movie;
    }

    async create(movie: CreateMovieDto): Promise<Movie> {
        Logger.log('create', this.TAG);

        const newMovie = new this.movieModel(movie);

        return newMovie.save();

        // const current = this.movies$.value;
        // const newMovie: IMovie = {
        //     ...movie,
        //     id: `movie-${Math.floor(Math.random() * 10000)}`,
        //     title: "test 2",
        //     photo: new Blob(),
        //     length: 35,
        //     releaseDate: new Date(),
        //     advicedAge: 16,
        //     genre: [Genre.Comedy],
        //     language: [Language.Dutch],
        //     director: 'Elco Mussert'
        // };
        // this.movies$.next([...current, newMovie]);
        // return newMovie;
    }
}