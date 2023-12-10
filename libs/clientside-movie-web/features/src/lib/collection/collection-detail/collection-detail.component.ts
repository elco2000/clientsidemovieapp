import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ICollection, IUser } from "@org/shared/api";
import { Subscription } from "rxjs";
import { CollectionService } from "../collection.service";
import { Movie } from "@org/backend/features";

@Component({
  selector: 'org-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css'],
})
export class CollectionDetailComponent implements OnInit, OnDestroy {
  id: string | null = null;
  collection: ICollection | null = null;
  user: IUser | null = null;
  movies: Movie[] | null = null;
  subscription: Subscription | undefined = undefined;
  ownInfo: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = idParam;
        this.loadCollectionData(idParam);
        this.loadMovieData();
      }
    });

    this.subscription = this.collectionService
      .read(this.id)
      .subscribe((result) => {
        if (result) {
          this.collection = result;
          this.checkForOwn(this.collection.userId, this.getTokenId());
          this.loadUserData(this.collection?.userId)
        }
      });

    this.subscription = this.collectionService
      .getMovies(this.id)
      .subscribe((result) => {
        if (result) {
            this.movies = result
        }
      })
  }

  loadCollectionData(userId: string) {
    this.collectionService.read(userId).subscribe((result) => {
      if (result) {
        this.collection = result;
      }
    });
  }

  loadUserData(userId: string | undefined) {
    this.collectionService.getUser(userId).subscribe((result) => {
      if (result) {
        this.user = result;
      }
    });
  }

  loadMovieData() {
    this.collectionService.movieList$.subscribe((result) => {
      this.movies = result;
    })
  }

  checkForOwn(urlId: string, tokenId: string): void {
    if (urlId === tokenId) {
      this.ownInfo = true;
    } else {
      this.ownInfo = false;
    }
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

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.collectionService.delete(id).subscribe(
      () => {
        this.router.navigateByUrl('/profile/' + this.getTokenId());
      }
    );
  }

  onRemoveMovie(collectionId: string, movieId: string) {
    this.collectionService.removeMovie(collectionId, movieId, this.getTokenId()).subscribe(
      () => {
        this.loadMovieData();
      }
    )
  }
}
