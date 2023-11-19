import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Movie } from '@org/backend/features';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie.service';

@Component({
  selector: 'org-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  id: string | null = null;
  movie: Movie | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = idParam;
      }
    });
    this.subscription = this.movieService.read(this.id).subscribe((result) => {
      if (result) {
        this.movie = result;
      }
    })

  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.movieService.delete(id).subscribe(
      () => {
        this.router.navigateByUrl('/movies');
      }
    );
  }
}
