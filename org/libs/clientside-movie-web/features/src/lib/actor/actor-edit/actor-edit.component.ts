/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actor } from '@org/backend/features';
import { Nationality } from '@org/shared/api';
import { Subscription } from 'rxjs';
import { ActorService } from '../actor.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'org-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css'],
})
export class ActorEditComponent implements OnInit {
  form!: FormGroup;
  id: string | null = null;
  actor: Actor | null = null;
  subscription: Subscription | undefined = undefined;

  nationalityList = Object.values(Nationality);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private actorService: ActorService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = idParam;
      }
    });
    this.subscription = this.actorService.read(this.id).subscribe((result) => {
      if (result) {
        this.actor = result;
        this.patchFormWithActorData();
      }
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      nationality: ['', Validators.required],
      photo: ['', Validators.required],
    });
  }

  private patchFormWithActorData() {
    if (this.actor && this.form) {
      this.form.patchValue({
        name: this.actor.name,
        birthdate: this.actor.birthdate,
        nationality: this.actor.nationality,
        photo: this.actor.photo,
      });
    }
  }

  private formatDate(date: Date): string {
    const formattedDate = new Date(date).toISOString().substring(0, 10);
    return formattedDate;
  }

  public onSubmit() {
    if (this.form && this.form.valid && this.actor) {
      const formValues = this.form.value;

      const updatedActor: Actor = {
        ...this.actor,
        ...formValues,
      };

      this.actorService.update(updatedActor).subscribe(
        (updatedResult) => {
          console.log('Acteur bijgewerkt:', updatedResult);
          this.router.navigateByUrl('/actors');
        },
        (error: any) => {
          console.error('Fout bij bijwerken acteur:', error);
        }
      );
    }
  }
}
