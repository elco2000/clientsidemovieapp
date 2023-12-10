import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: 'org-nav',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {

    constructor(private router: Router) {}

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

    getTokenId(): string {
        const userString = localStorage.getItem('user');
        let tokenId = '';
        if (userString) {
          const user = JSON.parse(userString);
          tokenId = user?.results?.id || null;
        }
        return tokenId;
      }
}