import { NgModule } from "@angular/core";
import { ReviewService } from "./review.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { ReviewCreateComponent } from "./review-create/review-create.component";
import { ReviewEditComponent } from "./review-edit/review-edit.component";

const routes: Routes = [
    {
        path: 'create/:movieId',
        pathMatch: 'full',
        component: ReviewCreateComponent
    },
    {
        path: 'edit/:reviewId',
        pathMatch: 'full',
        component: ReviewEditComponent
    }
]

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule.forChild(routes)],
    declarations: [ReviewCreateComponent, ReviewEditComponent],
    providers: [ReviewService],
    exports: [RouterModule, ReviewCreateComponent, ReviewEditComponent]
})
export class ReviewModule {}