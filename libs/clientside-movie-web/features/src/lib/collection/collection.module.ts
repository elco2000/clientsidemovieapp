import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CollectionService } from "./collection.service";
import { CollectionDetailComponent } from "./collection-detail/collection-detail.component";
import { CollectionEditComponent } from "./collection-edit/collection-edit.component";
import { CollectionCreateComponent } from "./collection-create/collection-create.component";

const routes: Routes = [
    {
        path: 'create',
        pathMatch: 'full',
        component: CollectionCreateComponent
    },
    {
        path: 'edit/:id',
        pathMatch: 'full',
        component: CollectionEditComponent
    },
    {
        path: ':id',
        pathMatch: 'full',
        component: CollectionDetailComponent
    }
]

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule.forChild(routes)],
    declarations: [CollectionDetailComponent, CollectionDetailComponent, CollectionEditComponent, CollectionCreateComponent],
    providers: [CollectionService],
    exports: [ RouterModule, CollectionDetailComponent, CollectionDetailComponent, CollectionEditComponent, CollectionCreateComponent]
})
export class CollectionModule {}