import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MovieService } from "../movie.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Movie } from "@org/backend/features";
import { Subscription } from "rxjs";
import { Genre, Language } from "@org/shared/api";

@Component({
    selector: 'org-movie-edit',
    templateUrl: './movie-edit.component.html',
    styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
    form!: FormGroup;
    id: string | null = null;
    movie: Movie | null = null;
    subscription: Subscription | undefined = undefined;

    genreList = Object.values(Genre);
    languageList = Object.values(Language);

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private movieService: MovieService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.route.paramMap.subscribe((params: ParamMap) => {
            const idParam = params.get('id');
            if (idParam !== null) {
              this.id = idParam;
            }
          });
          this.subscription = this.movieService.read(this.id).subscribe((result) => {
            if (result) {
              this.movie = result;
              this.patchFormWithMovieData();
            }
          })

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            photo: ['', Validators.required],
            length: ['', Validators.required],
            releaseDate: ['', Validators.required],
            advicedAge: ['', Validators.required],
            genre: ['', Validators.required],
            language: ['', Validators.required],
            director: ['', Validators.required]
        });
    }

    private patchFormWithMovieData() {
        if (this.movie && this.form) {
            this.form.patchValue({
                title: this.movie.title,
                photo: this.movie.photo,
                length: this.movie.length,
                releaseDate: this.formatDate(this.movie.releaseDate),
                advicedAge: this.movie.advicedAge,
                genre: this.movie.genre,
                language: this.movie.language,
                director: this.movie.director
            });
        }
    }

    private formatDate(date: Date): string {
        const formattedDate = new Date(date).toISOString().substring(0, 10);
        return formattedDate;
    }

    public onSubmit() {
        if (this.form && this.form.valid && this.movie) {
            // Haal de gegevens uit het formulier op
            const formValues = this.form.value;
        
            // Combineer de gegevens van het formulier met de bestaande filminformatie
            const updatedMovie: Movie = {
              ...this.movie,
              ...formValues
            };
        
            // Roep de update functie van de MovieService aan met de bijgewerkte film
            this.movieService.update(updatedMovie).subscribe(
              (updatedResult) => {
                console.log('Film bijgewerkt:', updatedResult);
                // Navigeer terug naar de filmlijst of een andere pagina indien nodig
                this.router.navigateByUrl('/movies');
              },
              (error) => {
                console.error('Fout bij bijwerken film:', error);
                // Handel eventueel de foutafhandeling af
              }
            );
          }
        }
    }