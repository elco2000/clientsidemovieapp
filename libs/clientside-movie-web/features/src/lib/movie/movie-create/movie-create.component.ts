import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Actor } from '@org/backend/features';
import { Subscription } from 'rxjs';
import { initFlowbite } from 'flowbite';
import { Genre, Language } from '@org/shared/api';

@Component({
  selector: 'org-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent implements OnInit, OnDestroy {
  genreList = Object.values(Genre);
  languageList = Object.values(Language);

  actors: Actor[] | null = null;
  selectedActors: { [_id: string]: boolean } = {};
  subscription: Subscription | undefined = undefined;

  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      photo: ['', Validators.required],
      length: ['', [Validators.required, Validators.min(1)]],
      releaseDate: [''],
      advicedAge: ['', [Validators.required, Validators.min(1)]],
      genre: ['', Validators.required],
      language: ['', Validators.required],
      director: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    initFlowbite();

    this.subscription = this.movieService.actorLookup().subscribe((results) => {
      if (results) {
        this.actors = results;
        this.actors.forEach(
          (actor) => (this.selectedActors[actor._id] = false)
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  public onSubmit() {
    const selectedActorIds = Object.keys(this.selectedActors).filter(
      (actorId) => this.selectedActors[actorId]
    );

    console.log(selectedActorIds);

    this.movieService
      .create({
        title: this.movieForm.value.title,
        photo: this.movieForm.value.photo,
        length: this.movieForm.value.length,
        releaseDate: this.movieForm.value.releaseDate,
        advicedAge: this.movieForm.value.advicedAge,
        genre: this.movieForm.value.genre,
        language: this.movieForm.value.language,
        director: this.movieForm.value.director,
        actors: selectedActorIds,
      })
      .subscribe(() => {
        this.router.navigateByUrl('/movies');
      });
  }

  toggleActorSelection(actorId: string): void {
    this.selectedActors[actorId] = !this.selectedActors[actorId];
  }
}
