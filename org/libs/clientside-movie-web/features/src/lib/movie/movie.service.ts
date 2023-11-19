/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IMovie } from '@org/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@org/shared/util-env';
import { CreateMovieDto } from '@org/backend/dto';
import { Movie } from '@org/backend/features';

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

/**
 *
 *
 */
@Injectable()
export class MovieService {
    endpoint = environment.dataApiUrl + '/api/movie';

    constructor(private readonly http : HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<Movie[] | null> {
        return this.http
            .get<ApiResponse<IMovie[]>>(this.endpoint, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as Movie[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<Movie> {
        return this.http
            .get<ApiResponse<Movie>>(this.endpoint, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as IMovie),
                catchError(this.handleError)
            );
    }

    /**
     * Create movie
     * 
     */
    public create(movie: CreateMovieDto, options?: any): Observable<IMovie>{

        console.log('create in web');

        const movieDto: CreateMovieDto = {
            ...movie,
        };


        return this.http
            .post<ApiResponse<IMovie>>(this.endpoint, movieDto, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IMovie),
                tap(console.log),
                catchError(this.handleError)
            )
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }

}