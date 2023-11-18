import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'org-nav',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {}