import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorsPageComponent } from '../../../authors-page/authors-page.component';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { IAuthorService } from 'src/app/interfaces/services/IAuthorService';

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
    @Inject(AuthorService) private _authorService: IAuthorService,
    private _formBuilder: FormBuilder
  ) {
    this.editAuthorForm = _formBuilder.group({
      'id': new FormControl(author.id),
      'name': new FormControl(author.name, Validators.required)
    });
   }

  public ngOnInit(): void {
  }

  public edit(editedAuthorForm: FormGroup): void {
    if (editedAuthorForm.invalid) {
      return;
    }
    this._authorService.editAuthor(editedAuthorForm.value as Author).subscribe(() => {
      this._dialogRef.close();
    });
  }

  public cancel(): void {
    this._dialogRef.close();
  }

  public get name() {
    return this.editAuthorForm.get("name");
  }
}
