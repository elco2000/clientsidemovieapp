/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateReviewDto } from "@org/backend/dto";
import { ApiResponse, IReview } from "@org/shared/api";
import { environment } from "@org/shared/util-env";
import { Observable, catchError, map, tap, throwError } from "rxjs";

@Injectable()
export class ReviewService {
    endpoint = environment.dataApiUrl + '/api/review';

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
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IReview> {
        return this.http
            .get<ApiResponse<IReview>>(`${this.endpoint}/${id}`, {
                ...options,
                ...this.httpOptions
            })
            .pipe(
                map((response: any) => response.results as IReview),
                catchError(this.handleError)
            );
    }

    /**
     * Update review
     * 
     */
    public update(review: IReview, options?: any): Observable<IReview>{

        return this.http
            .put<ApiResponse<IReview>>(`${this.endpoint}/${review.id}`, review, {
                ...options,
                ...this.httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IReview),
                tap(() => {}),
                catchError(this.handleError)
            )
    }

    /**
     * Create review
     * 
     */
    public create(review: CreateReviewDto, options?: any): Observable<IReview>{

        const reviewDto: CreateReviewDto = {
            ...review,
        };


        return this.http
            .post<ApiResponse<IReview>>(this.endpoint, reviewDto, {
                ...options,
                ...this.httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IReview),
                tap(() => {}),
                catchError(this.handleError)
            )
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        return throwError(() => new Error(error.message));
    }
}