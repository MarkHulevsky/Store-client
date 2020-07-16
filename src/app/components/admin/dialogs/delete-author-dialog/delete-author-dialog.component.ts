import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Author } from 'src/app/models/Author';
import { AuthorsPageComponent } from '../../authors-page/authors-page.component';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-delete-author-dialog',
  templateUrl: './delete-author-dialog.component.html',
  styleUrls: ['./delete-author-dialog.component.css']
})
export class DeleteAuthorDialogComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<AuthorsPageComponent>,
    @Inject(MAT_DIALOG_DATA) public author: Author,
    private _authorService: AuthorService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this._authorService.deleteAuthor(this.author.id).subscribe(() => {
      this._dialogRef.close();
    });
  }

  cancel() {
    this._dialogRef.close();
  }
}
