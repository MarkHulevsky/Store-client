import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthorsPageComponent } from '../../../authors-page/authors-page.component';
import { AuthorService } from 'src/app/services/author.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAuthorService } from 'src/app/interfaces/services/IAuthorService';


@Component({
  selector: 'app-add-author-dialog',
  templateUrl: './add-author-dialog.component.html',
  styleUrls: ['./add-author-dialog.component.css']
})
export class AddAuthorDialogComponent implements OnInit {

  public authorForm;
  public clicked: boolean;
  constructor(
    public dialogRef: MatDialogRef<AuthorsPageComponent>,
    @Inject(AuthorService) private _authorService: IAuthorService,
    private _formBuilder: FormBuilder
  ) { 
    this.clicked = false;
    this.authorForm = _formBuilder.group({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  public addAuthor(): void {
    if (this.authorForm.invalid)
    {
      return;
    }
    this.clicked = true;
    let author = this.authorForm.value; 
    this._authorService.addAuthor(author).subscribe(() => {
      this.dialogRef.close();
    })
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public get name() {
    return this.authorForm.get("name");
  }
}
