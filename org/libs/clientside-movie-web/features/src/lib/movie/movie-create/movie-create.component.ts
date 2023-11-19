import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { initFlowbite } from 'flowbite';
import { Genre, Language } from '@org/shared/api';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'org-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent implements OnInit {
  genreList = Object.values(Genre);
  languageList = Object.values(Language);

  movieForm = new FormGroup({
    title: new FormControl(),
    photo: new FormControl(),
    length: new FormControl(),
    releaseDate: new FormControl(),
    advicedAge: new FormControl(),
    genre: new FormControl(),
    language: new FormControl(),
    director: new FormControl(),
  });

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    initFlowbite();
  }

  public async fileToBlob(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as ArrayBuffer;
        const blob = new Blob([result], { type: file.type });
        resolve(blob);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  public async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]); // Verwijder het data-url deel
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(blob);
    });
  }

  public onSubmit() {
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
      })
      .subscribe();
  }
}
