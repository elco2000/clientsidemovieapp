
export enum Genre {
    Action = "Action",
    Adventure = "Adventure",
    Comedy = "Comedy",
    Crime = "Crime",
    Drama = "Drama",
    Fantasy = "Fantasy",
    Horror = "Horror",
    Scifi = "Sci-Fi",
    War = "War"
}

export enum Language {
    English = "English",
    Dutch = "Dutch",
    Japanese = "Japanese"
}

export interface IMovie {
    id: string,
    title: string,
    photo: string,
    length: number,
    releaseDate: Date,
    advicedAge: number,
    genre: string,
    language: string,
    director: string,
    actors: string[]
}

export type ICreateMovie = Pick<
    IMovie,
    'title' | 'photo' | 'length' | 'releaseDate' | 'advicedAge' | 'genre' | 'language' | 'director' | 'actors'
>;
export type IUpdateMovie = IMovie;