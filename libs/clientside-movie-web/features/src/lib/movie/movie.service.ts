/* eslint-disable @typescript-eslint/no-explicit-any */
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IActor, ICollection, IMovie, IReviewInfo } from '@org/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@org/shared/util-env';
import { CreateMovieDto } from '@org/backend/dto';
import { Actor, Movie } from '@org/backend/features';

/**
 *
 *
 */
@Injectable()
export class MovieService {
    endpoint = environment.dataApiUrl + '/api/movie';
    actorEndpoint = environment.dataApiUrl + '/api/actor';
    collectionEndpoint = environment.dataApiUrl + '/api/collection';

    private movieListSubject: BehaviorSubject<Movie[] | null> = new BehaviorSubject<Movie[] | null>(null);
    public readonly movieList$: Observable<Movie[] | null> = this.movieListSubject.asObservable();

    private collectionListSubject: BehaviorSubject<ICollection[] | null> = new BehaviorSubject<ICollection[] | null>(null);
    public readonly collectionList$: Observable<ICollection[] | null> = this.collectionListSubject.asObservable();

    private actorLookupListSubject: BehaviorSubject<Actor[] | null> = new BehaviorSubject<Actor[] | null>(null);
    public readonly actorLookupList$: Observable<Actor[] | null> = this.actorLookupListSubject.asObservable();

    private reviewListSubject: BehaviorSubject<IReviewInfo[] | null> = new BehaviorSubject<IReviewInfo[] | null>(null);
    public readonly reviewList$: Observable<IReviewInfo[] | null> = this.reviewListSubject.asObservable();

    constructor(private readonly http : HttpClient) {}

    private getTokenFromLocalStorage(): string | null {
        const userString = localStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          return user?.token || null;
        }
        return null;
      }
    
      private get httpOptions(): any {
        const token = this.getTokenFromLocalStorage();
    
        return {
          observe: 'body',
          responseType: 'json',
          headers: new HttpHeaders({
            Authorization: token ? `Bearer ${token}` : '',
          }),
        };
      }

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<Movie[] | null> {
        return this.http
            .get<ApiResponse<IMovie[]>>(this.endpoint, {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                map((response: any) => response.results as Movie[]),
                tap((movies: Movie[]) => {
                    this.movieListSubject.next(movies);
                  }),
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
            .get<ApiResponse<Movie>>(`${this.endpoint}/${id}`, {
                ...options,
                ...this.httpOptions
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

        const movieDto: CreateMovieDto = {
            ...movie,
        };


        return this.http
            .post<ApiResponse<IMovie>>(this.endpoint, movieDto, {
                ...options,
                ...this.httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IMovie),
                tap((createdMovie: IMovie) => {
                    console.log('Created movie:', createdMovie);
                    this.list();
                  }),
                catchError(this.handleError)
            )
    }

    /**
     * Update movie
     * 
     */
    public update(movie: Movie, options?: any): Observable<Movie>{

        return this.http
            .put<ApiResponse<Movie>>(`${this.endpoint}/${movie._id}`, movie, {
                ...options,
                ...this.httpOptions,
            })
            .pipe(
                map((response: any) => response.results as Movie),
                tap((updateMovie: Movie) => {
                    console.log('Update movie:', updateMovie);
                    this.list(); // Opnieuw getAll aanroepen na succesvolle creatie
                  }),
                catchError(this.handleError)
            )
    }

    /**
     *  Delete movie
     * 
     */
    public delete(id: string | null, options?: any): Observable<Movie> {
        return this.http
            .delete<ApiResponse<Movie>>(`${this.endpoint}/${id}`, {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                map((response: any) => response.results as IMovie),
                tap((deleted: IMovie) => {
                    console.log('Deleted movie:', deleted);
                    const updatedList = this.movieListSubject.getValue()?.filter(movie => movie._id !== id);
                    this.movieListSubject.next(updatedList || null);
                  }),
                catchError(this.handleError)
            );
    }

    /**
     * Get all actor for lookup.
     *
     */
    public actorLookup(options?: any): Observable<Actor[] | null> {
        return this.http
            .get<ApiResponse<IActor[]>>(this.actorEndpoint + "/lookup", {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                map((response: any) => response.results as Actor[]),
                tap((actors: Actor[]) => {
                    this.actorLookupListSubject.next(actors);
                  }),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Add movie to your collection of choose.
     *
     */
    public addMovieToCollection(collectionId: string, movieId: string, userId: string, options?: any): Observable<string> {
        return this.http
          .put<ApiResponse<string>>(`${this.collectionEndpoint}/movies/add`, {userId: userId, movieId: movieId, collectionId: collectionId}, {
            ...options,
            ...this.httpOptions,
          })
          .pipe(
            map((response: any) => response.results as string),
            tap((result: string) => {
              console.log('Update collection:', result);
            }),
            catchError(this.handleError)
          );
    }

    /**
     * Add get collections that doesn't include this movie
     *
     */
    public collections(id: string | null, options?: any): Observable<ICollection[] | null> {
        return this.http
            .get<ApiResponse<ICollection[]>>(`${this.collectionEndpoint}/without/${id}`, {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                map((response: any) => response.results as ICollection[]),
                tap((collections: ICollection[]) => {
                    this.collectionListSubject.next(collections);
                  }),
                tap(console.log),
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

     /**
     * Get reviews for a movie.
     * 
     */
     public getMovieReviews(movieId: string | null, options?: any): Observable<IReviewInfo[]> {
      const url = `${environment.dataApiUrl}/api/review/movie/${movieId}`;
      return this.http
          .get<ApiResponse<IReviewInfo[]>>(url, {
              ...options,
              ...this.httpOptions
          })
          .pipe(
              map((response: any) => response.results as IReviewInfo[]),
              tap((reviews: IReviewInfo[]) => {
                this.reviewListSubject.next(reviews);
              }),
              catchError(this.handleError)
          );
  }

}