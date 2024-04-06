import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Movie } from '@org/backend/features';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie.service';
import { ICollection } from '@org/shared/api';

@Component({
  selector: 'org-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  id: string | null = null;
  movie: Movie | null = null;
  collections: ICollection[] | null = null;
  subscription: Subscription | undefined = undefined;
  selectedCollectionId: string | undefined;

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
    this.subscription = this.movieService.collections(this.id).subscribe((result) => {
      if (result) {
        this.collections = result;
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

  getTokenId(): string {
    const userString = localStorage.getItem('user');
    let tokenId = '';
    if (userString) {
      const user = JSON.parse(userString);
      tokenId = user?.id || null;
    }
    return tokenId;
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

  onAddMovieToCollection(collectionId: string | undefined, movieId: string) {
    if (collectionId) { // Controleer of collectionId niet undefined is
      this.movieService.addMovieToCollection(collectionId, movieId, this.getTokenId()).subscribe(
        () => {
          if (collectionId) {
            this.router.navigateByUrl('/colllections/' + collectionId);
          }
        }
      )
    } else {
      // Behandel het geval waarin collectionId undefined is
      // Dit kan een foutafhandeling zijn of een andere logica
    }
  }
  
  onCollectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCollectionId = target.value || '';
  }
}
