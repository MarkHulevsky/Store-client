import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthorsPageComponent } from '../../../authors-page/authors-page.component';
import { AuthorService } from 'src/app/services/author.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-author-dialog',
  templateUrl: './add-author-dialog.component.html',
  styleUrls: ['./add-author-dialog.component.css']
})
export class AddAuthorDialogComponent implements OnInit {

  public authorForm;
  public click: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AuthorsPageComponent>,
    private _authorService: AuthorService,
    private _formBuilder: FormBuilder
  ) { 
    this.authorForm = _formBuilder.group({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  addAuthor() {
    if (this.authorForm.invalid)
    {
      return;
    }
    this.click = true;
    let author = this.authorForm.value; 
    this._authorService.addAuthor(author).subscribe(() => {
      this.dialogRef.close();
    })
  }

  cancel() {
    this.dialogRef.close();
  }

  get name() {
    return this.authorForm.get("name");
  }
}
