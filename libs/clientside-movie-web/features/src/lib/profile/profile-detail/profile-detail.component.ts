import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICollection, IUser } from '@org/shared/api';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'org-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css'],
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  id: string | null = null;
  user: IUser | null = null;
  followers: IUser[] | null = null;
  following: IUser[] | null = null;
  collections: ICollection[] | null = null;
  subscription: Subscription | undefined = undefined;
  ownInfo: boolean = false;
  followsAlready: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = idParam;
        this.loadUserData(idParam);
        this.checkForOwn(idParam, this.getTokenId());
      }
    });

    // Get user info
    this.subscription = this.profileService
      .read(this.id)
      .subscribe((result) => {
        if (result) {
          this.user = result;
        }
      });

    // Get followers
    this.subscription = this.profileService
      .getFollowers(this.id)
      .subscribe((results) => {
        if (results) {
          this.followers = results;
        }
        if (!this.ownInfo) {
          this.checkForFollow(this.getTokenId(), results);
          console.log('followers');
        }
      });

    // Get following
    this.subscription = this.profileService
      .getFollowing(this.id)
      .subscribe((results) => {
        if (results) {
          this.following = results;
        }
        if (this.ownInfo) {
          this.checkForFollow(this.getTokenId(), results);
          console.log('following');
        }
      });

    // Get collections
    this.subscription = this.profileService
      .collectionsOfUser(this.id)
      .subscribe((results) => {
        if (results) {
          this.collections = results;
        }
      });
  }

  loadUserData(userId: string) {
    this.profileService.read(userId).subscribe((result) => {
      if (result) {
        this.user = result;
      }
    });
  
    this.profileService.getFollowers(userId).subscribe((followers) => {
      if (followers) {
        this.followers = followers;
      }
    });
  
    this.profileService.getFollowing(userId).subscribe((following) => {
      if (following) {
        this.following = following;
      }
    });
  
    this.profileService.collectionsOfUser(userId).subscribe((collections) => {
      if (collections) {
        this.collections = collections;
      }
    });
  }
  

  checkForOwn(urlId: string, tokenId: string): void {
    if (urlId === tokenId) {
      this.ownInfo = true;
    } else {
      this.ownInfo = false;
    }
  }

  checkForFollow(userId: string, userList: IUser[] | null): void {
    if (!userList) {
      this.followsAlready = false;
      return;
    }

    // Controleer of de huidige gebruiker al in de lijst van gebruikers voorkomt
    const foundUser = userList.find((user) => user.id === userId);
    console.log(foundUser);
    if(foundUser === null || foundUser === undefined) {
      this.followsAlready = false;
    } else {
      this.followsAlready = true;
    }
  }

  getTokenId(): string {
    const userString = localStorage.getItem('user');
    let tokenId = '';
    if (userString) {
      const user = JSON.parse(userString);
      tokenId = user?.results?.id || null;
    }
    return tokenId;
  }

  public onFollowActionButton() {
    if (!this.followsAlready) {
      this.profileService.follow(this.getTokenId(), this.user?.id).subscribe( () => {
        this.router.navigateByUrl('/profile/' + this.getTokenId())
      })
    } else {
      this.profileService.unfollow(this.getTokenId(), this.user?.id).subscribe( () => {
        this.router.navigateByUrl('/profile/' + this.getTokenId())
      })
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
