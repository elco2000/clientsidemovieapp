import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { ReviewService } from "../review.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { initFlowbite } from "flowbite";

@Component({
    selector: 'org-review-create',
    templateUrl: './review-create.component.html',
    styleUrls: []
})
export class ReviewCreateComponent implements OnInit, OnDestroy {
    subscription: Subscription | undefined = undefined;
    movieId!: string;

    reviewForm = new FormGroup({
        title: new FormControl(),
        text: new FormControl(),
        rating: new FormControl()
    });

    constructor(private route: ActivatedRoute, private reviewService: ReviewService, private router: Router) {}

    ngOnInit(): void {
        initFlowbite();
        this.route.paramMap.subscribe((params: ParamMap) => {
            const idParam = params.get('movieId');
            if (idParam !== null) {
              this.movieId = idParam;
            }
          });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
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

        this.reviewService
            .create({
                title: this.reviewForm.value.title,
                text: this.reviewForm.value.text,
                rating: this.reviewForm.value.rating | 5,
                userId: this.getTokenId(),
                movieId: this.movieId
            })
            .subscribe(
                () => {
                  this.router.navigateByUrl('/movies/' + this.movieId);
                }
              );
    }
    
}