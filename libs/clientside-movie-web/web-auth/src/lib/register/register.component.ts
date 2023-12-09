import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { first } from "rxjs";

@Component({
    selector: 'org-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    submitted = false;
  
    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private authService: AuthService,) { }
  
    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        birthdate: ['', [Validators.required]],
        country: ['', [Validators.required]],
        description: ['']
      });
    }
  
    onSubmit() {
      this.submitted = true;
    
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        return;
    }
  
      this.authService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(() => {
            this.router.navigate(['../login'], { relativeTo: this.route });
        });
    }
  }
  