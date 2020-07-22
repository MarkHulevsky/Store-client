import { Component, OnInit, ViewChild } from '@angular/core';
import { PrintingEditionResponseFilter } from 'src/app/models/ResponseFilters/PrintingEditionResponseFilter';
import { PrintingEditionFilter } from 'src/app/models/RequestFilters/PrintingEditionFilter';
import { MatTableDataSource } from '@angular/material/table';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { Constants } from 'src/app/models/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../dialogs/add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-product-managment',
  templateUrl: './product-managment.component.html',
  styleUrls: ['./product-managment.component.css']
})
export class ProductManagmentComponent implements OnInit {

  public peResponseFilter = new PrintingEditionResponseFilter;
  public peFilter = new PrintingEditionFilter;
  public displayedColumns = ['name', 'description', 'category', 'author', 'price'];
  public dataSource = new MatTableDataSource<PrintingEdition>();
  public data: PrintingEdition[] = [];
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public resultsLength = 0;
    
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(
    private _peService: PrintingEditionService,
    private _constants: Constants,
    private _dialog: MatDialog
  ) { 
    this.sort = new MatSort;
    this.peFilter = _constants.printingEditionFilter;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

  ngAfterViewInit() {
    this.getPrintingEditions();  
  }

  getPrintingEditions() {
    this.dataSource.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.dataSource.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.peFilter.paging.currentPage = this.dataSource.paginator.pageIndex;
          return this._peService.getFiltred(this.peFilter);
        }),
        map((data: PrintingEditionResponseFilter) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;
          return data.printingEditions;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
        ).subscribe((data: PrintingEdition[]) => this.data = data);
  }

  add() {
    this._dialog.open(AddProductDialogComponent, {
      width: "1000px"
    })
  }
}
