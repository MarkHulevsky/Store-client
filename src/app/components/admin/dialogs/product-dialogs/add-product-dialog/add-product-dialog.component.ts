import { Component, OnInit, Inject } from '@angular/core';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/app/models/constants/constants';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductManagmentComponent } from '../../../product-managment/product-managment.component';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/app/models/Author';
import { IPrintingEditionService } from 'src/app/interfaces/services/IPrintingEditionService';
import { IAuthorService } from 'src/app/interfaces/services/IAuthorService';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css'],
})
export class AddProductDialogComponent implements OnInit {

  public printingEditionForm: FormGroup;
  public clicked: boolean = false;
  public authors: Author[] = [];
  
  constructor(
    @Inject(PrintingEditionService) private _printingEditionService: IPrintingEditionService,
    private _formBuilder: FormBuilder,
    public _constants: Constants,
    private _dialogRef: MatDialogRef<ProductManagmentComponent>,
    @Inject(AuthorService) private _authorService: IAuthorService
  ) {
    this.printingEditionForm = _formBuilder.group({
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
    if (this.printingEditionForm.invalid) {
      return;
    }
    let printingEdition = this.printingEditionForm.value as PrintingEdition;
    printingEdition.authors = [];
    let author = this.printingEditionForm.get('author').value as Author;
    printingEdition.authors.push(author);
    this._printingEditionService.add(printingEdition).subscribe(() => {
      this.clicked = true;
      this._dialogRef.close();
    });
  }

  cancel(): void {
    this._dialogRef.close();
  }
}
