import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CreateUserDto } from "@org/backend/dto";
import { IUserIdentity } from "@org/shared/api";
import { environment } from "@org/shared/util-env";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
    providedIn: 'any'
})
export class AuthService {
    private authUrl = environment.dataApiUrl + '/api/';
    private userSubject: BehaviorSubject<IUserIdentity>
    public user: Observable<IUserIdentity>

    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject<IUserIdentity>(JSON.parse(localStorage.getItem('user') || 'null'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): IUserIdentity {
        return this.userSubject.value;
      }
    
    
      login(username: string, password: string) {
        return this.http.post<IUserIdentity>(this.authUrl + "auth/login", {username, password})
          .pipe(map((user: IUserIdentity) => {
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
          }));
      }
    
      logout() {
        localStorage.removeItem('user');
        this.userSubject = new BehaviorSubject<IUserIdentity>(JSON.parse(localStorage.getItem('user') || 'null') || undefined);
        this.router.navigate(['/login']);
      }
    
      register(user: CreateUserDto) {
        return this.http.post(this.authUrl + "auth/register", user);
      }
    
      public getToken(): string {
        if (this.userValue !== null && this.userValue !== undefined) {
          return this.userValue.token || "";
        } else {
          return "";
        }
      } 
}