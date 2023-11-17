/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IMovie } from '@org/shared/api';
import { Injectable } from '@angular/core';

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
    endpoint = 'http://localhost:3000/api/movie';

    constructor(private readonly http : HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IMovie[] | null> {
        return this.http
            .get<ApiResponse<IMovie[]>>(this.endpoint, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as IMovie[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IMovie> {
        return this.http
            .get<ApiResponse<IMovie>>(this.endpoint, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as IMovie),
                catchError(this.handleError)
            );
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }
}