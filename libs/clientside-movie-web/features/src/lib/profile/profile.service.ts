/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UpdateUserDto } from "@org/backend/dto";
import { ApiResponse, ICollection, IUser, IUserInfo } from "@org/shared/api";
import { environment } from "@org/shared/util-env";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";

/**
 *
 *
 */
@Injectable()
export class ProfileService {
    endpoint = environment.dataApiUrl + '/api/user';
    collectionEndpoint = environment.dataApiUrl + '/api/collection';

    private followersListSubject: BehaviorSubject<IUser[] | null> = new BehaviorSubject<IUser[] | null>(null);
    public readonly followersList$: Observable<IUser[] | null> = this.followersListSubject.asObservable();

    private followingListSubject: BehaviorSubject<IUser[] | null> = new BehaviorSubject<IUser[] | null>(null);
    public readonly followingList$: Observable<IUser[] | null> = this.followingListSubject.asObservable();

    private collectionsOfUserListSubject: BehaviorSubject<ICollection[] | null> = new BehaviorSubject<ICollection[] | null>(null);
    public readonly collectionsOfUserList$: Observable<ICollection[] | null> = this.collectionsOfUserListSubject.asObservable();    

    constructor(private readonly http : HttpClient) {}

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
                Authorization: token ? `Bearer ${token}` : ''
            })
        };
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IUser> {
        return this.http
            .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            );
    }

    /**
     * Update profile
     * 
     */
    public update(user: UpdateUserDto, options?: any): Observable<IUserInfo>{

        return this.http
            .put<ApiResponse<IUserInfo>>(`${this.endpoint}/${user.id}`, user, {
                ...options,
                ...this.httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IUserInfo),
                tap((updateUser: IUserInfo) => {
                    console.log('Update user:', updateUser);
                  }),
                catchError(this.handleError)
            )
    }

    /**
     * Get all following of user.
     *
     */
    public getFollowers(id: string | null, options?: any): Observable<IUser[] | null> {
        return this.http
            .get<ApiResponse<IUser[]>>(`${this.endpoint}/${id}/followers`, {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                map((response: any) => response.results as IUser[]),
                tap((followers: IUser[]) => {
                    this.followersListSubject.next(followers);
                  }),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get all following of user.
     *
     */
    public getFollowing(id: string | null, options?: any): Observable<IUser[] | null> {
        return this.http
            .get<ApiResponse<IUser[]>>(`${this.endpoint}/${id}/following`, {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                map((response: any) => response.results as IUser[]),
                tap((following: IUser[]) => {
                    this.followingListSubject.next(following);
                  }),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Follow User
     * 
     */
    public follow(ownId: string, userToFollowId: string, options?: any): Observable<string>{

        return this.http
            .put<ApiResponse<IUserInfo>>(`${this.endpoint}/${ownId}/follow/${userToFollowId}`, {
                ...options,
                ...this.httpOptions,
            })
            .pipe(
                map((response: any) => console.log('Followed user status:', response)),
                catchError(this.handleError)
            )
    }

    /**
     * Unfollow User
     * 
     */
    public unfollow(ownId: string, userToUnfollowId: string, options?: any): Observable<string>{

        return this.http
            .put<ApiResponse<IUserInfo>>(`${this.endpoint}/${ownId}/unfollow/${userToUnfollowId}`, {
                ...options,
                ...this.httpOptions,
            })
            .pipe(
                map((response: any) => console.log('Unfollow user status:', response)),
                catchError(this.handleError)
            )
    }

    /**
     * Get collections of user.
     *
     */
    public collectionsOfUser(id: string | null, options?: any): Observable<ICollection[]> {
        return this.http
            .get<ApiResponse<ICollection>>(`${this.collectionEndpoint}/user/${id}`, {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                map((response: any) => response.results as ICollection[]),
                tap((collections: ICollection[]) => {
                    this.collectionsOfUserListSubject.next(collections);
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