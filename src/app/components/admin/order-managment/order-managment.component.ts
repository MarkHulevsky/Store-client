import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { OrderRequestModel } from 'src/app/models/RequestModels/OrderRequestModel';
import { OrderResponseModel } from 'src/app/models/ResponseModels/OrderResponseModel';
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
  public orderRequestModel: OrderRequestModel;
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
  public orderResponseModel: OrderResponseModel;
  public dataSource: MatTableDataSource<Order>;
  public resultsLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    @Inject(OrderService) private _orderService: IOrderService,
    public constants: Constants
  ) {
    this.orderResponseModel = new OrderResponseModel;
    this.dataSource = new MatTableDataSource<Order>();
    this.sort = new MatSort();
    this.orderRequestModel = constants.DEFAULT_ORDER_REQUEST_MODEL;
    this.statuses = new FormControl(this.constants.ORDER_STATUS_STRINGS);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    this.dataSource.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.dataSource.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.orderRequestModel.paging.currentPage = this.dataSource.paginator.pageIndex;
          return this._orderService.getFiltred(this.orderRequestModel);
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
  public orderBy(propName: string): void {
    this.orderRequestModel.sortPropertyName = propName;
    this.changeSortType();
    this.getOrders();
  }

  public statusFilterChanged(): void {
    let statuses = this.statuses.value;
    this.orderRequestModel.orderStatuses = statuses;
    this.getOrders();
  }

  private changeSortType(): void {
    if (this.orderRequestModel.sortType == SortType.Ascending) {
      this.orderRequestModel.sortType = SortType.Descending;
      return;
    }
    this.orderRequestModel.sortType = SortType.Ascending;
  }
}
