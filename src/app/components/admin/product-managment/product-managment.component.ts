import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PrintingEditionResponseModel } from 'src/app/models/ResponseModels/PrintingEditionResponseModel';
import { PrintingEditionRequestModel } from 'src/app/models/RequestModels/PrintingEditionRequestModel';
import { MatTableDataSource } from '@angular/material/table';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { Constants } from 'src/app/models/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../dialogs/product-dialogs/add-product-dialog/add-product-dialog.component';
import { DeleteProductDialogComponent } from '../dialogs/product-dialogs/delete-product-dialog/delete-product-dialog.component';
import { EditProductDialogComponent } from '../dialogs/product-dialogs/edit-product-dialog/edit-product-dialog.component';
import { SortType } from 'src/app/enums/enums';
import { IPrintingEditionService } from 'src/app/interfaces/services/IPrintingEditionService';

@Component({
  selector: 'app-product-managment',
  templateUrl: './product-managment.component.html',
  styleUrls: ['./product-managment.component.css']
})
export class ProductManagmentComponent implements OnInit {

  public printingEditionResponseModel: PrintingEditionResponseModel;
  public printingEditionRequestModel:PrintingEditionRequestModel;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<PrintingEdition>;
  public data: PrintingEdition[]
  public resultsLength = 0;
    
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(
    @Inject(PrintingEditionService) private _printigEditionService: IPrintingEditionService,
    private _constants: Constants,
    private _dialog: MatDialog
  ) { 
    this.data = [];
    this.displayedColumns = ['name', 'description', 'category', 'author', 'price', 'customColumn'];
    this.dataSource = new MatTableDataSource<PrintingEdition>();
    this.printingEditionResponseModel = new PrintingEditionResponseModel;
    this.printingEditionRequestModel = new PrintingEditionRequestModel;
    this.sort = new MatSort;
    this.printingEditionRequestModel = _constants.DEFAULT_PRINTING_EDITION_REQUEST_MODEL;
    this.printingEditionRequestModel.paging.itemsCount = 6;
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }
  
  ngAfterViewInit(): void {
    this.getPrintingEditions();
  }

  private getPrintingEditions(): void {
    this.dataSource.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.dataSource.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.printingEditionRequestModel.paging.currentPage = this.dataSource.paginator.pageIndex;
          return this._printigEditionService.getFiltred(this.printingEditionRequestModel);
        }),
        map((data: PrintingEditionResponseModel) => {
          this.resultsLength = data.totalCount;
          return data.printingEditions;
        }),
        catchError(() => {
          return of([]);
        })
        ).subscribe((printingEditions: PrintingEdition[]) => this.data = printingEditions);
  }

  public add(): void {
    this._dialog.open(AddProductDialogComponent, {
      width: "1000px"
    });
    this._dialog.afterAllClosed.subscribe(() => {
      this.getPrintingEditions();
    });
  }

  public delete(product: PrintingEdition): void {
    this._dialog.open(DeleteProductDialogComponent, {
      width: '400px',
      data: {
        id: product.id,
        title: product.title
      } as PrintingEdition
    });
    this._dialog.afterAllClosed.subscribe(() => {
      this.getPrintingEditions();
    });
  }

  public edit(product: PrintingEdition): void {
    this._dialog.open(EditProductDialogComponent, {
      width: '1000px',
      data: {
        id: product.id,
        title: product.title,
        currency: product.currency,
        description: product.description,
        price: product.price,
        type: product.type,
        authors: product.authors
      } as PrintingEdition
    });
    this._dialog.afterAllClosed.subscribe(() => {
      this.getPrintingEditions();
    });
  }

  public sortProducts(): void {
    this.changeSortType();
    this.dataSource.paginator.firstPage();
    this.getPrintingEditions();
  }

  private changeSortType() {
    if (this.printingEditionRequestModel.sortType == SortType.Ascending) {
      this.printingEditionRequestModel.sortType = SortType.Descending;
      return;
    }
    this.printingEditionRequestModel.sortType = SortType.Ascending;
  }
}
