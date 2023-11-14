import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Genre, IMovie, Language } from "@org/shared/api";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class MovieService {
    TAG = 'MovieService';

    private movies$ = new BehaviorSubject<IMovie[]>([
        {
            id: '0',
            title: 'Test Film',
            photo: new File([], 'test.png'),
            length: 55,
            releaseDate: new Date(),
            advicedAge: 12,
            genre: [Genre.Action],
            language: [Language.Dutch],
            director: 'Elco Mussert'
        }
    ]);

    getAll(): IMovie[] {
        Logger.log('getAll', this.TAG);
        return this.movies$.value;
    }

    getOne(id: string): IMovie {
        Logger.log(`getOne(${id})`, this.TAG);
        const movie = this.movies$.value.find((td) => td.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie could not be found!`);
        }
        return movie;
    }

    create(movie: Pick<IMovie, 'title' | 'photo' | 'length' | 'releaseDate' | 'advicedAge' | 'genre' | 'language' | 'director'>): IMovie {
        Logger.log('create', this.TAG);
        const current = this.movies$.value;
        const newMovie: IMovie = {
            ...movie,
            id: `movie-${Math.floor(Math.random() * 10000)}`,
            title: "test 2",
            photo: new File([], 'test.png'),
            length: 35,
            releaseDate: new Date(),
            advicedAge: 16,
            genre: [Genre.Comedy],
            language: [Language.Dutch],
            director: 'Elco Mussert'
        };
        this.movies$.next([...current, newMovie]);
        return newMovie;
    }
}