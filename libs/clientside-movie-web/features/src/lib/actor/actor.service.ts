/* eslint-disable @typescript-eslint/no-explicit-any */

import { environment } from "@org/shared/util-env";
import { Actor, Movie } from "@org/backend/features";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApiResponse, IActor, IMovie } from "@org/shared/api";
import { CreateActorDto } from "@org/backend/dto";
import { Injectable } from "@angular/core";

export const httpOptions = {
    observe: 'body',
    responseType: 'json'
};

/**
 * 
 * 
 */
@Injectable()
export class ActorService {
    endpoint = environment.dataApiUrl + '/api/actor';
    endpointMovie = environment.dataApiUrl + '/api/movie';

    private actorListSubject: BehaviorSubject<Actor[] | null> = new BehaviorSubject<Actor[] | null>(null);
    public readonly actorList$: Observable<Actor[] | null> = this.actorListSubject.asObservable();

    constructor(private readonly http : HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<Actor[] | null> {
        return this.http
            .get<ApiResponse<IActor[]>>(this.endpoint, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as Actor[]),
                tap((movies: Actor[]) => {
                    this.actorListSubject.next(movies);
                  }),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<Actor> {
        return this.http
            .get<ApiResponse<Actor>>(`${this.endpoint}/${id}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as IActor),
                catchError(this.handleError)
            );
    }

    /**
     * Create actor
     * 
     */
    public create(actor: CreateActorDto, options?: any): Observable<IActor>{

        const actorDto: CreateActorDto = {
            ...actor,
        };


        return this.http
            .post<ApiResponse<IActor>>(this.endpoint, actorDto, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IActor),
                tap((createdActor: IActor) => {
                    console.log('Created actor:', createdActor);
                    this.list();
                  }),
                catchError(this.handleError)
            )
    }

    /**
     * Update actor
     * 
     */
    public update(actor: Actor, options?: any): Observable<Actor>{

        return this.http
            .put<ApiResponse<Actor>>(`${this.endpoint}/${actor._id}`, actor, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as Actor),
                tap((updateActor: Actor) => {
                    console.log('Update movie:', updateActor);
                    this.list();
                  }),
                catchError(this.handleError)
            )
    }

    /**
     *  Delete actor
     * 
     */
    public delete(id: string | null, options?: any): Observable<Actor> {
        return this.http
            .delete<ApiResponse<Actor>>(`${this.endpoint}/${id}`, {
                ...options,
                ...httpOptions
            })
            .pipe(
                map((response: any) => response.results as IActor),
                tap((deleted: IActor) => {
                    console.log('Deleted actor:', deleted);
                    const updatedList = this.actorListSubject.getValue()?.filter(actor => actor._id !== id);
                    this.actorListSubject.next(updatedList || null);
                  }),
                catchError(this.handleError)
            );
    }


    /**
     * Get a movies of a actor from the service.
     *
     */
    public getActorMovies(id: string | null, options?: any): Observable<Movie[]> {
        return this.http
            .get<ApiResponse<Movie>>(`${this.endpointMovie}/actor/${id}`, {
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