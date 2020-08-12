import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductManagmentComponent } from '../../../product-managment/product-managment.component';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { IPrintingEditionService } from 'src/app/interfaces/services/IPrintingEditionService';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<ProductManagmentComponent>,
    @Inject(MAT_DIALOG_DATA) public product: PrintingEdition,
    @Inject(PrintingEditionService) private _printingEditionService: IPrintingEditionService
  ) { }

  ngOnInit(): void {
  }

  delete(): void {
    this._printingEditionService.delete(this.product.id).subscribe(() => {
      this._dialogRef.close();
    });
  }

  cancel(): void {
    this._dialogRef.close();
  }

}
