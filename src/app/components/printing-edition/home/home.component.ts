import { Component, OnInit, ViewChild, Inject } from '@angular/core';
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
import { PrintingEditionType, Currency, SortType } from 'src/app/enums/enums';
import { IPrintingEditionService } from 'src/app/interfaces/services/IPrintingEditionService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public printingEditionResponseFilter = new PrintingEditionResponseFilter;
  public printingEditionFilter = new PrintingEditionFilter;
  public displayedColumns = [];
  public dataSource = new MatTableDataSource<PrintingEdition>();
  public data: PrintingEdition[] = [];
  public resultsLength = 0;
  public currentCurrency: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    @Inject(PrintingEditionService) private _peService: IPrintingEditionService,
    public constants: Constants,
  ) {
    this.sort = new MatSort;
    this.printingEditionFilter = constants.printingEditionFilter;
    this.printingEditionFilter.paging.itemsCount = 8;
    this.currentCurrency = constants.currencyStrings[0];
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  ngAfterViewInit(): void {
    this.getPrintingEditions();
    this.currencyChanged(this.constants.currencyStrings[0]);
  }

  getPrintingEditions(): void {
    this.dataSource.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.dataSource.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.printingEditionFilter.paging.currentPage = this.dataSource.paginator.pageIndex;
          return this._peService.getFiltred(this.printingEditionFilter);
        }),
        map((data: PrintingEditionResponseFilter) => {
          this.resultsLength = data.totalCount;
          return data.printingEditions;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe((data: PrintingEdition[]) => {
        this.data = data;
      });
  }

  search(event): void {
    this.printingEditionFilter.searchString = event.target.value;
    this.getPrintingEditions();
  }

  maxPriceFilter(event): void {
    if (event.target.value !== this.constants.emptyString) {
      if (this.printingEditionFilter.minPrice === null) {
        this.printingEditionFilter.minPrice = 0;
      }
      this.printingEditionFilter.maxPrice = parseInt(event.target.value);
      this.getPrintingEditions();
    }
  }

  minPriceFilter(event): void {
    if (event.target.value !== this.constants.emptyString) {
      if (this.printingEditionFilter.maxPrice === null) {
        this.printingEditionFilter.maxPrice = 0;
      }
      this.printingEditionFilter.minPrice = parseInt(event.target.value);
      this.getPrintingEditions();
    }
  }

  checkBoxChanged(event, typeString: string) {
    let isChecked: boolean = event.target.checked;
    let type: PrintingEditionType = PrintingEditionType[typeString];
    if (isChecked) {
      this.printingEditionFilter.types.push(type);
    }
    if (!isChecked) {
      let index = this.printingEditionFilter.types.indexOf(type, 0);
      if (index > -1) {
        this.printingEditionFilter.types.splice(index, 1);
      }
    }
    this.getPrintingEditions();
  }

  currencyChanged(currencyString: string) {
    if (currencyString === this.constants.emptyString) {
      this.getPrintingEditions();
      return;
    }
    this.data.forEach(pe => {
      let currentCurrency = this.constants.currencyStrings[pe.currency];
      if (currencyString == currentCurrency)
      {
        return;
      }
      this._peService.convertCurrency(currentCurrency, currencyString).subscribe((rate: number) => {
        pe.currency = Currency[currencyString];
        pe.price = Math.round(pe.price * rate);
        currentCurrency = currencyString;
      });
    });
  }

  sortByPrice(value: string) {
    this.printingEditionFilter.sortType = SortType[value];
    this.getPrintingEditions();
  }
}
