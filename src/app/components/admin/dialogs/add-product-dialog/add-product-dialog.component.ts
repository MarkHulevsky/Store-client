import { Component, OnInit, Inject } from '@angular/core';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/app/models/constants/constants';
import { Currency, PrintingEditionType } from 'src/app/enums/enums';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductManagmentComponent } from '../../product-managment/product-managment.component';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/app/models/Author';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css'],
})
export class AddProductDialogComponent implements OnInit {

  public peForm: FormGroup;
  public clicked: boolean = false;
  public authors: Author[] = [];
  constructor(
    private _peService: PrintingEditionService,
    private _formBuilder: FormBuilder,
    public _constants: Constants,
    private _dialogRef: MatDialogRef<ProductManagmentComponent>,
    private _authorService: AuthorService
  ) {
    this.peForm = _formBuilder.group({
      'title': new FormControl(_constants.emptyString, Validators.required),
      'description': new FormControl(_constants.emptyString, Validators.required),
      'price': new FormControl(0, Validators.required),
      'currency': new FormControl(_constants.currencyStrings[0], Validators.required),
      'type': new FormControl(_constants.printingEditionTypeStrings[0], Validators.required),
      'author': new FormControl(new Author, Validators.required)
    });
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this._authorService.getAll().subscribe((data: Author[]) => {
      this.authors = data;
    });
  }

  add(): void {
    if (this.peForm.invalid) {
      return;
    }
    let pe = this.peForm.value as PrintingEdition;
    pe.authors = [];
    let author = this.peForm.get('author').value as Author;
    pe.authors.push(author);
    this._peService.add(pe).subscribe(() => {
      this.clicked = true;
      this._dialogRef.close();
    });
  }

  cancel(): void {
    this._dialogRef.close();
  }
}
