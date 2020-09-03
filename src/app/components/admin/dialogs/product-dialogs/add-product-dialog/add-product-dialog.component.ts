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
    public constants: Constants,
    private _dialogRef: MatDialogRef<ProductManagmentComponent>,
    @Inject(AuthorService) private _authorService: IAuthorService
  ) {
    this.printingEditionForm = _formBuilder.group({
      'title': new FormControl(constants.EMPTY_STRING, Validators.required),
      'description': new FormControl(constants.EMPTY_STRING, Validators.required),
      'price': new FormControl(0, Validators.required),
      'currency': new FormControl(constants.CURRENCY_TYPE_STRINGS[0], Validators.required),
      'type': new FormControl(constants.PRINTING_EDITION_TYPE_STRINGS[0], Validators.required),
      'author': new FormControl(new Author, Validators.required)
    });
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  private getAuthors(): void {
    this._authorService.getAll().subscribe((data: Author[]) => {
      this.authors = data;
    });
  }

  public add(): void {
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

  public cancel(): void {
    this._dialogRef.close();
  }
}
