import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie.service';
import { Movie } from '@org/backend/features'


@Component({
  selector: 'org-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieService.list().subscribe((results) => {
      if (results) {
        this.movies = results.map(movie => {
          return {
            ...movie,
          };
        });
      }
    });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
}
