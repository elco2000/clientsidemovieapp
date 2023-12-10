import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ICollection } from "@org/shared/api";
import { Subscription } from "rxjs";
import { CollectionService } from "../collection.service";
import { EditCollectionDto } from "@org/backend/dto";

@Component({
  selector: 'org-collection-edit',
  templateUrl: './collection-edit.component.html',
  styleUrls: ['./collection-edit.component.css'],
})
export class CollectionEditComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  id: string | null = null;
  collection: ICollection | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = idParam;
      }
    });
    this.subscription = this.collectionService
      .read(this.id)
      .subscribe((result) => {
        if (result) {
          this.collection = result;
          this.patchFormWithUserData();
        }
      });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      privateCollection: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private patchFormWithUserData() {
    if (this.collection && this.form) {
      this.form.patchValue({
        name: this.collection.name,
        description: this.collection.description,
        privateCollection: this.collection.privateCollection
      });
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

  public onSubmit() {
    if (this.form && this.form.valid && this.collection) {
      const formValues = this.form.value;

      const updatedCollection: EditCollectionDto = {
        id: this.id,
        ...formValues,
        userId: this.getTokenId()
      };

      this.collectionService.update(updatedCollection).subscribe(
        (updatedResult) => {
          console.log('Collection bijgewerkt:', updatedResult);
          this.router.navigateByUrl('/collections/' + this.id);
        },
        (error) => {
          console.error('Fout bij bijwerken Collection:', error);
        }
      );
    }
  }
}
