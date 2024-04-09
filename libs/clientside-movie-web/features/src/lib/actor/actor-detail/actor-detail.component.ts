import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Actor, Movie } from '@org/backend/features';
import { Subscription } from 'rxjs';
import { ActorService } from '../actor.service';

@Component({
  selector: 'org-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
})
export class ActorDetailComponent implements OnInit, OnDestroy {
  id: string | null = null;
  actor: Actor | null = null;
  movies: Movie[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = idParam;
      }
    });
    this.subscription = this.actorService.read(this.id).subscribe((result) => {
      if (result) {
        this.actor = result;
      }
    });
    this.subscription = this.actorService
      .getActorMovies(this.id)
      .subscribe((result) => {
        if (result) {
          this.movies = result;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.actorService.delete(id).subscribe(() => {
      this.router.navigateByUrl('/actors');
    });
  }

  getTokenRole(): string | null {
    const userString = localStorage.getItem('user');
    if (userString === undefined || userString === null) {
      return null;
    }
    let tokenRole = '';
    if (userString) {
      const user = JSON.parse(userString);
      tokenRole = user?.role || null;
    }
    return tokenRole;
  }
}
