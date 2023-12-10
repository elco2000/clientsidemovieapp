/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UpdateUserDto } from "@org/backend/dto";
import { ApiResponse, ICollection, IUser, IUserInfo, initialUser } from "@org/shared/api";
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

    private userSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(initialUser);
    public readonly user$: Observable<IUser> = this.userSubject.asObservable();

    private userListSubject: BehaviorSubject<IUser[] | null> = new BehaviorSubject<IUser[] | null>(null);
    public readonly userList$: Observable<IUser[] | null> = this.userListSubject.asObservable();

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
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IUser[] | null> {
        return this.http
            .get<ApiResponse<IUser[]>>(this.endpoint, {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                map((response: any) => response.results as IUser[]),
                tap((users: IUser[]) => {
                    this.userListSubject.next(users);
                  }),
                tap(console.log),
                catchError(this.handleError)
            );
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
                tap((user: IUser) => {
                    this.userSubject.next(user);
                  }),
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
    public follow(ownId: string, userToFollowId: string | undefined, options?: any): Observable<IUser>{

        return this.http
            .put<ApiResponse<IUserInfo>>(`${this.endpoint}/${ownId}/follow/${userToFollowId}`, {
                ...options,
                ...this.httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IUser),
                tap((user: IUser) => {
                    this.userSubject.next(user);
                    this.updateFollowersAndFollowing(ownId); // Na het ontvolgen, update de volgers en gevolgden
                }),
                catchError(this.handleError)
            )
    }

    /**
     * Unfollow User
     * 
     */
    public unfollow(ownId: string, userToUnfollowId: string | undefined, options?: any): Observable<IUser>{

        return this.http
            .put<ApiResponse<IUserInfo>>(`${this.endpoint}/${ownId}/unfollow/${userToUnfollowId}`, {
                ...options,
                ...this.httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IUser),
                tap((user: IUser) => {
                    this.userSubject.next(user);
                    this.updateFollowersAndFollowing(ownId); // Na het ontvolgen, update de volgers en gevolgden
                }),
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

    private updateFollowersAndFollowing(id: string) {
        // Haal de volgers opnieuw op
        this.getFollowers(id).subscribe((followers) => {
          if (followers) {
            this.followersListSubject.next(followers);
          }
        });
    
        // Haal de gevolgden opnieuw op
        this.getFollowing(id).subscribe((following) => {
          if (following) {
            this.followingListSubject.next(following);
          }
        });

        this.collectionsOfUser(id).subscribe((collections) => {
            if (collections) {
              this.collectionsOfUserListSubject.next(collections);
            }
          });
      }

     /**
     * Handle errors.
     */
     public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in MealService', error);

        return throwError(() => new Error(error.message));
    }

}