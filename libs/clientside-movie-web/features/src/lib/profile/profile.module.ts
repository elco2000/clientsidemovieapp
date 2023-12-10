import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ProfileService } from "./profile.service";
import { ProfileDetailComponent } from "./profile-detail/profile-detail.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ProfileListComponent } from "./profile-list/profile.list.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProfileListComponent
    },
    {
        path: 'edit/:id',
        pathMatch: 'full',
        component: ProfileEditComponent
    },
    {
        path: ':id',
        pathMatch: 'full',
        component: ProfileDetailComponent
    }
]

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule.forChild(routes)],
    declarations: [ProfileDetailComponent, ProfileEditComponent, ProfileListComponent],
    providers: [ProfileService],
    exports: [RouterModule, ProfileDetailComponent, ProfileEditComponent, ProfileListComponent]
})
export class ProfileModule {}