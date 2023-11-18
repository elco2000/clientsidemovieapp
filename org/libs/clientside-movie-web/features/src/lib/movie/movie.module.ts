import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MovieService } from "./movie.service";
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MovieListComponent
    }
]

@NgModule({
    imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes)],
    declarations: [MovieListComponent, MovieDetailComponent],
    providers: [MovieService],
    exports: [MovieListComponent, MovieDetailComponent, RouterModule]
})
export class MovieModule {}