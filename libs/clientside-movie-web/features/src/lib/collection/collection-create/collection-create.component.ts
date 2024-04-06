import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CollectionService } from "../collection.service";
import { Router } from "@angular/router";

@Component({
  selector: 'org-collection-create',
  templateUrl: './collection-create.component.html',
  styleUrls: ['./collection-create.component.css'],
})
export class CollectionCreateComponent {

  collectionForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    privateCollection: new FormControl(),
  });

  constructor(private collectionService: CollectionService, private router: Router) {}

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

    this.collectionService
      .create({
        name: this.collectionForm.value.name,
        description: this.collectionForm.value.description,
        privateCollection: this.collectionForm.value.privateCollection,
        userId: this.getTokenId()
      })
      .subscribe(
        () => {
          this.router.navigateByUrl('/profile/' + this.getTokenId());
        }
      );
  }
}
