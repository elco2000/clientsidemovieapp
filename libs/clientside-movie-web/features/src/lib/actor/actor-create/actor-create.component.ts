import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
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

    actorForm = new FormGroup({
        name: new FormControl(),
        birthdate: new FormControl(),
        nationality: new FormControl(),
        photo: new FormControl()
    });

    constructor(private actorService: ActorService, private router: Router) {}

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