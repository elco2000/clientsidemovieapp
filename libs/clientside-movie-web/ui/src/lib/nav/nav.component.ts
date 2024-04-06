import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "@org/clientside-movie-web/web-auth";


@Component({
    selector: 'org-nav',
    standalone: true,
    imports: [CommonModule, RouterModule, HttpClientModule],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {


    constructor(private router: Router, private authService: AuthService) {}

    isActiveRoute(route: string): boolean {
      return this.router.url === route;
    }

    getUsername(): string {
        const userString = localStorage.getItem('user');
        let username = '';
        if (userString) {
          const user = JSON.parse(userString);
          username = user?.results?.username || null;
        }
        return username;
    }

    getTokenId(): string | null {
        const userString = localStorage.getItem('user');
        if (userString === undefined || userString === null) {
          return null;
        }
        let tokenId = '';
        if (userString) {
          const user = JSON.parse(userString);
          tokenId = user?.results?.id || null;
        }
        return tokenId;
      }
    
      onLogout() {
        this.authService.logout();
        this.router.navigateByUrl('');
      }
      
}