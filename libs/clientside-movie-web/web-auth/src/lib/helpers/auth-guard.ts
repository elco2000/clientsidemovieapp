import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.userValue;
        if (user) {
          return true;
        }
    
        this.router.navigate(['/auth/login'], {
          queryParams: { returnUrl: state.url}
        });
        return false;
      }
    
}