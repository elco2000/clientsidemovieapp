import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReviewService } from '../review.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IReview } from '@org/shared/api';
import { Location } from '@angular/common';

@Component({
  selector: 'org-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: [],
})
export class ReviewEditComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  review: IReview | null = null;
  reviewId: string | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('reviewId');
      if (idParam !== null) {
        this.reviewId = idParam;
      }
    });

    this.subscription = this.reviewService
      .read(this.reviewId)
      .subscribe((result) => {
        if (result) {
          this.review = result;
          this.patchFormWithReviewData();
        }
      });

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private patchFormWithReviewData() {
    if (this.review && this.form) {
      this.form.patchValue({
        title: this.review.title,
        text: this.review.text,
        rating: this.review.rating,
      });
    }
  }

  public onSubmit() {
    if (this.form && this.form.valid && this.review) {

      const formValues = this.form.value;

      const updatedReview: IReview = {
        ...this.review,
        ...formValues,
      };

      this.reviewService.update(updatedReview).subscribe(
        (updatedResult) => {
          console.log('review bijgewerkt:', updatedResult);
          this.location.back();
        },
        (error) => {
          console.error('Fout bij bijwerken review:', error);
        }
      );
    }
  }

  onDelete(id: string): void {
    this.reviewService.delete(id).subscribe(
        () => {
            console.log("Test");
            this.location.back();
        }
    )
  }
}
