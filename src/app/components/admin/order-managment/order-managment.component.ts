import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { OrderFilter } from 'src/app/models/RequestFilters/OrderFilter';
import { OrderResponseFilter } from 'src/app/models/ResponseFilters/OrderResponseFulter';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { Constants } from 'src/app/models/constants/constants';
import { Currency, SortType } from 'src/app/enums/enums';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-managment',
  templateUrl: './order-managment.component.html',
  styleUrls: ['./order-managment.component.css']
})
export class OrderManagmentComponent implements OnInit {

  public statuses: FormControl;
  public orderFilter: OrderFilter;
  public orders: Order[];
  public displayedColumns: string[] = [
    'Date',
    'UserName',
    'UserEmail',
    'Product',
    'Title',
    'Qty',
    'Amount',
    'Status'
  ];
  public orderResponseFilter = new OrderResponseFilter;
  public dataSource = new MatTableDataSource<Order>();
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public resultsLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _orderService: OrderService,
    public constants: Constants
  ) {
    this.sort = new MatSort();
    this.orderFilter = constants.orderFilter;
    this.statuses = new FormControl(this.constants.orderStatusStrings);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.dataSource.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.dataSource.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.orderFilter.paging.currentPage = this.dataSource.paginator.pageIndex;
          return this._orderService.getFiltred(this.orderFilter);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;
          return data.orders;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe((data: Order[]) => {
        this.orders = data;
        this.orders.forEach(order => {
          let amount = 0;
          let currency: Currency;
          order.orderItems.forEach(orderItem => {
            amount += orderItem.amount;
            currency = orderItem.printingEdition.currency;
          });
          order.amount = amount;
          order.currency = currency;
        });
      });
  }
  orderBy(propName: string) {
    debugger
    this.orderFilter.propName = propName;
    this.changeSortType();
    this.getOrders();
  }

  statusFilterChanged() {
    let statuses = this.statuses.value;
    this.orderFilter.orderStatuses = statuses;
    this.getOrders();
  }

  private changeSortType(): void {
    if (this.orderFilter.sortType == SortType.ascending) {
      this.orderFilter.sortType = SortType.descending;
      return;
    }
    this.orderFilter.sortType = SortType.ascending;
  }
}
