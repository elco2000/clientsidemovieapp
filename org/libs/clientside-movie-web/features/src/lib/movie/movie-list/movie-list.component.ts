import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMovie } from '@org/shared/api';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie.service';

@Component({
  selector: 'org-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: IMovie[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
      this.subscription = this.movieService.list().subscribe((results) => {
        this.movies = results;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
}
