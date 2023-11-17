import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MovieListComponent } from "./movie/movie-list/movie-list.component";
import { MovieDetailComponent } from "./movie/movie-detail/movie-detail.component";
import { MovieService } from "./movie/movie.service";

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [MovieListComponent, MovieDetailComponent],
    providers: [MovieService],
    exports: [MovieListComponent, MovieDetailComponent]
})
export class FeaturesModule {}