import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Nationality } from "@org/shared/api";
import { ActorService } from "../actor.service";
import { Router } from "@angular/router";
import { initFlowbite } from "flowbite";

@Component({
    selector: 'org-actor-create',
    templateUrl: './actor-create.component.html',
    styleUrls: ['./actor-create.component.css']
})
export class ActorCreateComponent implements OnInit {
    nationalityList = Object.values(Nationality);

    actorForm: FormGroup;

    constructor(private fb: FormBuilder, private actorService: ActorService, private router: Router) {
        this.actorForm = this.fb.group({
            name: ['', Validators.required],
            birthdate: ['', Validators.required],
            nationality: ['', Validators.required],
            photo: ['', Validators.required]
          });
    }

    ngOnInit(): void {
        initFlowbite();
    }

    public onSubmit() {
        this.actorService
            .create({
                name: this.actorForm.value.name,
                birthdate: this.actorForm.value.birthdate,
                nationality: this.actorForm.value.nationality,
                photo: this.actorForm.value.photo
            })
            .subscribe(
                () => {
                    this.router.navigateByUrl('/actors');
                }
            )
    }
}