/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCollectionDto, EditCollectionDto } from '@org/backend/dto';
import { Movie } from '@org/backend/features';
import { ApiResponse, ICollection, IMovie, IUser } from '@org/shared/api';
import { environment } from '@org/shared/util-env';
import { BehaviorSubject, Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';

/**
 *
 *
 */
@Injectable()
export class CollectionService {
  endpoint = environment.dataApiUrl + '/api/collection';
  endpointMovie = environment.dataApiUrl + '/api/movie';
  endpointProfile = environment.dataApiUrl + '/api/user';

  private collectionSubject: BehaviorSubject<ICollection | null> =
    new BehaviorSubject<ICollection | null>(null);
  public readonly collection$: Observable<ICollection | null> =
    this.collectionSubject.asObservable();

  private userSubject: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  public readonly user$: Observable<IUser | null> =
    this.userSubject.asObservable();

    private movieIdListSubject: BehaviorSubject<string[] | null> =
    new BehaviorSubject<string[] | null>(null);
  public readonly movieIdList$: Observable<string[] | null> = 
    this.movieIdListSubject.asObservable();

  private movieListSubject: BehaviorSubject<Movie[] | null> =
    new BehaviorSubject<Movie[] | null>(null);
  public readonly movieList$: Observable<Movie[] | null> = 
    this.movieListSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  private getTokenFromLocalStorage(): string | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user?.results?.token || null;
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
   * Get a single collection from the service.
   *
   */
  public read(id: string | null, options?: any): Observable<ICollection> {
    return this.http
      .get<ApiResponse<ICollection>>(`${this.endpoint}/${id}`, {
        ...options,
        ...this.httpOptions,
      })
      .pipe(
        map((response: any) => response.results as ICollection),
        tap((collection: ICollection) => {
          this.collectionSubject.next(collection);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single user from the service.
   *
   */
  public getUser(id: string | undefined, options?: any): Observable<IUser> {
    return this.http
      .get<ApiResponse<IUser>>(`${this.endpointProfile}/${id}`, {
        ...options,
        ...this.httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IUser),
        tap((user: IUser) => {
          this.userSubject.next(user);
        }),
        catchError(this.handleError)
      );
  }

  /**
     * Create collection
     * 
     */
  public create(collection: CreateCollectionDto, options?: any): Observable<ICollection>{

    const collectionDto: CreateCollectionDto = {
        ...collection,
    };


    return this.http
        .post<ApiResponse<ICollection>>(this.endpoint, collectionDto, {
            ...options,
            ...this.httpOptions,
        })
        .pipe(
            map((response: any) => response.results as ICollection),
            tap((createdCollection: ICollection) => {
                console.log('Created Collection:', createdCollection);
              }),
            catchError(this.handleError)
        )
}

  /**
   * Update collection
   *
   */
  public update(collection: EditCollectionDto, options?: any): Observable<ICollection> {
    return this.http
      .put<ApiResponse<ICollection>>(`${this.endpoint}/${collection.id}`, collection, {
        ...options,
        ...this.httpOptions,
      })
      .pipe(
        map((response: any) => response.results as ICollection),
        tap((updateCollection: ICollection) => {
          console.log('Update collection:', updateCollection);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Update collection
   *
   */
  public removeMovie(collectionId: string, movieId: string, userId: string, options?: any): Observable<ICollection> {
    return this.http
      .put<ApiResponse<ICollection>>(`${this.endpoint}/movies/remove`, {userId: userId, movieId: movieId, collectionId: collectionId}, {
        ...options,
        ...this.httpOptions,
      })
      .pipe(
        map((response: any) => response.results as ICollection),
        tap((updateCollection: ICollection) => {
          console.log('Update collection:', updateCollection);
          this.getMovieIds(collectionId);
        }),
        catchError(this.handleError)
      );
  }

  /**
     *  Delete collection
     * 
     */
  public delete(id: string | null, options?: any): Observable<ICollection> {
    return this.http
        .delete<ApiResponse<ICollection>>(`${this.endpoint}/${id}`, {
            ...options,
            ...this.httpOptions
        })
        .pipe(
            map((response: any) => response.results as ICollection),
            tap((deleted: ICollection) => {
                console.log('Deleted collection:', deleted);
              }),
            catchError(this.handleError)
        );
}

public getMovieIds(id: string | null, options?: any): Observable<string[]> {
  return this.http
    .get<ApiResponse<string[]>>(`${this.endpoint}/${id}/movies`, {
      ...options,
      ...this.httpOptions,
    })
    .pipe(
      map((response: any) => response.results as string[]),
      tap((movieIds: string[]) => {
        this.movieIdListSubject.next(movieIds);
      }),
      catchError(this.handleError)
    );
}

public getMovies(id: string | null, options?: any): Observable<Movie[]> {
  return this.getMovieIds(id).pipe(
    switchMap((movieIds: string[]) => {
      return this.http.put<ApiResponse<IMovie[]>>(
        `${this.endpointMovie}/collection`,
        movieIds, // Assuming 'ids' is the key for movieIds
        {
          ...options,
          ...this.httpOptions,
        }
      ).pipe(
        map((response: any) => response.results as Movie[]),
        tap((movies: Movie[]) => {
          this.movieListSubject.next(movies);
        }),
        catchError(this.handleError)
      );
    }),
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
