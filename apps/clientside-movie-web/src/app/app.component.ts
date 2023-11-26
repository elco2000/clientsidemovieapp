import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NavComponent } from '@org/ui'

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, NavComponent],
  selector: 'org-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'clientside-movie-web';
}
