import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { PrintingEditionResponseModel } from 'src/app/models/ResponseModels/PrintingEditionResponseModel';
import { PrintingEditionRequestModel } from 'src/app/models/RequestModels/PrintingEditionRequestModel';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { Constants } from 'src/app/models/constants/constants';
import { PrintingEditionType, CurrencyType, SortType } from 'src/app/enums/enums';
import { IPrintingEditionService } from 'src/app/interfaces/services/IPrintingEditionService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public printingEditionResponseModel: PrintingEditionResponseModel;
  public printingEditionRequestModel: PrintingEditionRequestModel;
  public displayedColumns = [];
  public dataSource: MatTableDataSource<PrintingEdition>;
  public data: PrintingEdition[];
  public currentCurrency: string;
  public resultsLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    @Inject(PrintingEditionService) private _printingEditionService: IPrintingEditionService,
    public constants: Constants,
  ) {
    this.dataSource = new MatTableDataSource<PrintingEdition>();
    this.data = [];
    this.printingEditionRequestModel  = new PrintingEditionRequestModel;
    this.printingEditionResponseModel = new PrintingEditionResponseModel;
    this.sort = new MatSort;
    this.printingEditionRequestModel = constants.DEFAULT_PRINTING_EDITION_REQUEST_MODEL;
    this.printingEditionRequestModel.paging.itemsCount = 8;
    this.currentCurrency = constants.CURRENCY_TYPE_STRINGS[0];
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  ngAfterViewInit(): void {
    this.getPrintingEditions();
    this.currencyChanged(this.constants.CURRENCY_TYPE_STRINGS[0]);
  }

  private getPrintingEditions(): void {
    this.dataSource.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.dataSource.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.printingEditionRequestModel.paging.currentPage = this.dataSource.paginator.pageIndex;
          return this._printingEditionService.getFiltred(this.printingEditionRequestModel);
        }),
        map((data: PrintingEditionResponseModel) => {
          this.resultsLength = data.totalCount;
          return data.printingEditions;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe((printingEditions: PrintingEdition[]) => {
        this.data = printingEditions;
      });
  }

  public search(event): void {
    this.printingEditionRequestModel.searchString = event.target.value;
    this.getPrintingEditions();
  }

  public maxPriceFilter(event): void {
    if (event.target.value !== this.constants.EMPTY_STRING) {
      if (this.printingEditionRequestModel.minPrice === null) {
        this.printingEditionRequestModel.minPrice = 0;
      }
      this.printingEditionRequestModel.maxPrice = parseInt(event.target.value);
      this.getPrintingEditions();
    }
  }

  public minPriceFilter(event): void {
    if (event.target.value !== this.constants.EMPTY_STRING) {
      if (this.printingEditionRequestModel.maxPrice === null) {
        this.printingEditionRequestModel.maxPrice = 0;
      }
      this.printingEditionRequestModel.minPrice = parseInt(event.target.value);
      this.getPrintingEditions();
    }
  }

  public checkBoxChanged(event, typeString: string): void {
    let isChecked: boolean = event.target.checked;
    let type: PrintingEditionType = PrintingEditionType[typeString];
    if (isChecked) {
      this.printingEditionRequestModel.types.push(type);
    }
    if (!isChecked) {
      let index = this.printingEditionRequestModel.types.indexOf(type, 0);
      if (index > -1) {
        this.printingEditionRequestModel.types.splice(index, 1);
      }
    }
    this.getPrintingEditions();
  }

  public currencyChanged(currencyString: string): void {
    if (currencyString === this.constants.EMPTY_STRING) {
      this.getPrintingEditions();
      return;
    }
    this.data.forEach(printingEdition => {
      let currentCurrency = this.constants.CURRENCY_TYPE_STRINGS[printingEdition.currency - 1];
      if (currencyString == currentCurrency)
      {
        return;
      }
      this._printingEditionService.convertCurrency(currentCurrency, currencyString).subscribe((rate: number) => {
        printingEdition.currency = CurrencyType[currencyString];
        printingEdition.price = Math.round(printingEdition.price * rate);
        currentCurrency = currencyString;
      });
    });
  }

  public sortByPrice(value: string): void {
    this.printingEditionRequestModel.sortType = SortType[value];
    this.getPrintingEditions();
  }
}
