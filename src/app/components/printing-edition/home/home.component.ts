import { Component, OnInit, ViewChild } from '@angular/core';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { PrintingEditionResponseFilter } from 'src/app/models/ResponseFilters/PrintingEditionResponseFilter';
import { PrintingEditionFilter } from 'src/app/models/RequestFilters/PrintingEditionFilter';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { Constants } from 'src/app/models/constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public peResponseFilter = new PrintingEditionResponseFilter;
  public peFilter = new PrintingEditionFilter;
  public displayedColumns = [];
  public dataSource = new MatTableDataSource<PrintingEdition>();
  public data: PrintingEdition[] = [];
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public resultsLength = 0;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _peService: PrintingEditionService,
    private _constants: Constants
  ) {
    this.sort = new MatSort;
    this.peFilter = _constants.printingEditionFilter;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
}
