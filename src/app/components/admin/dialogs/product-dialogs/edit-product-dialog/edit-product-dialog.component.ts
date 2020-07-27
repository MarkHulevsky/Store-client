import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductManagmentComponent } from '../../../product-managment/product-managment.component';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';
import { Constants } from 'src/app/models/constants/constants';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {

  public peForm: FormGroup;
  public clicked: boolean = false;
  public authors: Author[] = [];

  constructor(
    private _dialogRef: MatDialogRef<ProductManagmentComponent>,
    @Inject(MAT_DIALOG_DATA) public product: PrintingEdition,
    private _peService: PrintingEditionService,
    private _formBuilder: FormBuilder,
    public _constants: Constants,
    private _authorService: AuthorService
  ) { 
    this.peForm = _formBuilder.group({
      'id': new FormControl(product.id),
      'title': new FormControl(product.title, Validators.required),
      'description': new FormControl(product.description, Validators.required),
      'price': new FormControl(product.price, Validators.required),
      'currency': new FormControl(product.currency, Validators.required),
      'type': new FormControl(product.type, Validators.required),
      'author': new FormControl(product?.authors[0])
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

  edit(): void {
    if (this.peForm.invalid) {
      return;
    }
    let pe = this.peForm.value as PrintingEdition;
    pe.authors = [];
    let author = this.peForm.get('author').value as Author;
    pe.authors = [author];
    this._peService.edit(pe).subscribe(() => {
      this.clicked = true;
      this._dialogRef.close();
    });
  }

  cancel() {
    this._dialogRef.close();
  }
}
