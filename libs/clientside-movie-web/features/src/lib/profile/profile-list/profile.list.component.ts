import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@org/shared/api';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'org-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfileListComponent implements OnInit, OnDestroy {
  users: IUser[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.subscription = this.profileService.list().subscribe((results) => {
      if (results) {
        this.users = results;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
