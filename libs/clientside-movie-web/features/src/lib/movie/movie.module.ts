import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MovieService } from "./movie.service";
import { Routes, RouterModule } from '@angular/router';
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MovieEditComponent } from "./movie-edit/movie-edit.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MovieListComponent
    },
    {
        path: 'create',
        pathMatch: 'full',
        component: MovieCreateComponent
    },
    {
        path: 'edit/:id',
        pathMatch: 'full',
        component: MovieEditComponent
    },
    {
        path: ':id',
        pathMatch: 'full',
        component: MovieDetailComponent
    }
]

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule.forChild(routes)],
    declarations: [MovieListComponent, MovieDetailComponent, MovieCreateComponent, MovieEditComponent],
    providers: [MovieService],
    exports: [MovieListComponent, MovieDetailComponent, MovieCreateComponent, MovieEditComponent, RouterModule]
})
export class MovieModule {}