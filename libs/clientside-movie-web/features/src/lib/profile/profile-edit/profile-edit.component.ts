import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '@org/shared/api';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UpdateUserDto } from '@org/backend/dto';

@Component({
  selector: 'org-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  id: string | null = null;
  user: IUser | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = idParam;
      }
    });
    this.subscription = this.profileService
      .read(this.id)
      .subscribe((result) => {
        if (result) {
          this.user = result;
          if(this.getTokenId() !== result.id) {
            this.router.navigateByUrl('/');
          }
          this.patchFormWithUserData();
        }
      });

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      description: [''],
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private patchFormWithUserData() {
    if (this.user && this.form) {
      this.form.patchValue({
        username: this.user.username,
        description: this.user.description,
      });
    }
  }

  getTokenId(): string {
    const userString = localStorage.getItem('user');
    let tokenId = '';
    if (userString) {
      const user = JSON.parse(userString);
      tokenId = user?.id || null;
    }
    return tokenId;
  }

  public onSubmit() {
    if (this.form && this.form.valid && this.user) {
      const formValues = this.form.value;

      const updatedUser: UpdateUserDto = {
        id: this.getTokenId(),
        ...formValues,
      };

      this.profileService.update(updatedUser).subscribe(
        (updatedResult) => {
          console.log('Profile bijgewerkt:', updatedResult);
          this.router.navigateByUrl('/profile/' + this.getTokenId());
        },
        (error) => {
          console.error('Fout bij bijwerken user:', error);
        }
      );
    }
  }
}
