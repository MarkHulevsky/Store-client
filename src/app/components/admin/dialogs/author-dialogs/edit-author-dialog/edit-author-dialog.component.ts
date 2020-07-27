import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorsPageComponent } from '../../../authors-page/authors-page.component';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-author-dialog',
  templateUrl: './edit-author-dialog.component.html',
  styleUrls: ['./edit-author-dialog.component.css']
})
export class EditAuthorDialogComponent implements OnInit {

  public editAuthorForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<AuthorsPageComponent>,
    @Inject(MAT_DIALOG_DATA) public author: Author,
    private _authorService: AuthorService,
    private _formBuilder: FormBuilder
  ) {
    this.editAuthorForm = _formBuilder.group({
      'id': new FormControl(author.id),
      'name': new FormControl(author.name, Validators.required)
    });
   }

  ngOnInit(): void {
  }

  edit(editedAuthorForm: FormGroup) {
    if (editedAuthorForm.invalid) {
      return;
    }
    this._authorService.editAuthor(editedAuthorForm.value as Author).subscribe(() => {
      this._dialogRef.close();
    });
  }

  cancel() {
    this._dialogRef.close();
  }

  get name() {
    return this.editAuthorForm.get("name");
  }
}
