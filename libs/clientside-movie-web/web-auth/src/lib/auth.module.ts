import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "./auth.service";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: 'login', 
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule.forChild(routes)],
    declarations: [LoginComponent, RegisterComponent],
    providers: [AuthService],
    exports: [RouterModule, LoginComponent, RegisterComponent]
})
export class AuthModule {}

