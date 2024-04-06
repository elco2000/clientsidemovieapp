import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ActorService } from "./actor.service";
import { ActorCreateComponent } from "./actor-create/actor-create.component";
import { ActorListComponent } from "./actor-list/actor-list.component";
import { ActorDetailComponent } from "./actor-detail/actor-detail.component";
import { ActorEditComponent } from "./actor-edit/actor-edit.component";
import { RoleGuard } from "@org/clientside-movie-web/web-auth";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ActorListComponent
    },
    {
        path: 'create',
        pathMatch: 'full',
        canActivate: [RoleGuard],
        component: ActorCreateComponent
    },
    {
        path: 'edit/:id',
        pathMatch: 'full',
        canActivate: [RoleGuard],
        component: ActorEditComponent
    },
    {
        path: ':id',
        pathMatch: 'full',
        component: ActorDetailComponent
    }
]

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule.forChild(routes)],
    declarations: [ActorCreateComponent, ActorListComponent, ActorDetailComponent, ActorEditComponent],
    providers: [ActorService],
    exports: [RouterModule, ActorCreateComponent, ActorListComponent, ActorDetailComponent, ActorEditComponent]
})
export class ActorModule {}

