import { Component, OnInit, ViewChild, Inject } from '@angular/core';
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
import { CurrencyType, SortType } from 'src/app/enums/enums';
import { FormControl } from '@angular/forms';
import { IOrderService } from 'src/app/interfaces/services/IOrderService';

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
  public resultsLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    @Inject(OrderService) private _orderService: IOrderService,
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

  getOrders(): void {
    this.dataSource.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.dataSource.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.orderFilter.paging.currentPage = this.dataSource.paginator.pageIndex;
          return this._orderService.getFiltred(this.orderFilter);
        }),
        map(data => {
          this.resultsLength = data.totalCount;
          return data.orders;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe((orders: Order[]) => {
        this.orders = orders;
        this.orders.forEach(order => {
          let amount = 0;
          let currency: CurrencyType;
          order.orderItems.forEach(orderItem => {
            amount += orderItem.amount;
            currency = orderItem.printingEdition.currency;
          });
          order.amount = amount;
          order.currency = currency;
        });
      });
  }
  orderBy(propName: string): void {
    this.orderFilter.sortPropertyName = propName;
    this.changeSortType();
    this.getOrders();
  }

  statusFilterChanged(): void {
    let statuses = this.statuses.value;
    this.orderFilter.orderStatuses = statuses;
    this.getOrders();
  }

  private changeSortType(): void {
    if (this.orderFilter.sortType == SortType.Ascending) {
      this.orderFilter.sortType = SortType.Descending;
      return;
    }
    this.orderFilter.sortType = SortType.Ascending;
  }
}
