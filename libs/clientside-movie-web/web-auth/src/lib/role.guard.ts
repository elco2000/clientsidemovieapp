import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'any'
})
export class RoleGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = 'Admin'; // Get the expected role from route data
      const userRole = this.authService.getRole(); // Get the role of the current user from AuthService
      console.log(userRole);

      // Check if the user has the expected role
      if (userRole === expectedRole) {
        return true; // User is allowed to access the route
      } else {
        // Redirect the user to a different route (or show an error message)
        this.router.navigate(['/']);
        return false; // User is not allowed to access the route
      }
  }
}