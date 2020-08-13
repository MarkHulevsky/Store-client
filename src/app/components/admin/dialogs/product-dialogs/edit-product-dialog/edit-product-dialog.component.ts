import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductManagmentComponent } from '../../../product-managment/product-managment.component';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';
import { Constants } from 'src/app/models/constants/constants';
import { IPrintingEditionService } from 'src/app/interfaces/services/IPrintingEditionService';
import { IAuthorService } from 'src/app/interfaces/services/IAuthorService';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {

  public printingEditionForm: FormGroup;
  public clicked: boolean = false;
  public authors: Author[] = [];

  constructor(
    private _dialogRef: MatDialogRef<ProductManagmentComponent>,
    @Inject(MAT_DIALOG_DATA) public product: PrintingEdition,
    @Inject(PrintingEditionService) private _printingEditionService: IPrintingEditionService,
    private _formBuilder: FormBuilder,
    public _constants: Constants,
    @Inject(AuthorService) private _authorService: IAuthorService
  ) { 
    this.printingEditionForm = _formBuilder.group({
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
    this._authorService.getAll().subscribe((author: Author[]) => {
      this.authors = author;
    });
  }

  edit(): void {
    if (this.printingEditionForm.invalid) {
      return;
    }
    let printingEdition = this.printingEditionForm.value as PrintingEdition;
    printingEdition.authors = [];
    let author = this.printingEditionForm.get('author').value as Author;
    printingEdition.authors = [author];
    this._printingEditionService.edit(printingEdition).subscribe(() => {
      this.clicked = true;
      this._dialogRef.close();
    });
  }

  cancel() {
    this._dialogRef.close();
  }
}
