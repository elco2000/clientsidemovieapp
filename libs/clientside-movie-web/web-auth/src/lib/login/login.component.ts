import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { first } from "rxjs";

@Component({
    selector: 'org-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    submitted!: boolean;
  
    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private authService: AuthService,) {
    }
  
    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  
    getUsername() {
      return this.loginForm.get('username');
    }
  
    getPassword() {
      return this.loginForm.get('password');
    }
  
    onSubmit() {
      this.submitted = true;
  
      if (this.loginForm.invalid) {
        return;
      }
      this.authService.login(this.getUsername()?.value, this.getPassword()?.value)
        .pipe(first())
        .subscribe(() => {
            const returnUrl = '/'
            this.router.navigateByUrl(returnUrl)
        })
    }
  }
  