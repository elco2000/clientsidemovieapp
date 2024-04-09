import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '@org/backend/features';
import { Subscription } from 'rxjs';
import { ActorService } from '../actor.service';

@Component({
  selector: 'org-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css'],
})
export class ActorListComponent implements OnInit, OnDestroy {
  actors: Actor[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private actorService: ActorService) {}

  ngOnInit(): void {
    this.subscription = this.actorService.list().subscribe((results) => {
      if (results) {
        this.actors = results;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
