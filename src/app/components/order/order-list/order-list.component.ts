import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { Currency, Status } from 'src/app/enums/enums';
import { MatDialog } from '@angular/material/dialog';
import { CardDialogComponent } from '../../cart/dialogs/card-dialog/card-dialog.component';
import { Token } from '@stripe/stripe-js';
import { Payment } from 'src/app/models/Payment';
import { Constants } from 'src/app/models/constants/constants';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public orders: Order[] = [];
  public displayedColumns: string[] = ["Order time", "Product", "Title", "Qty", "Order amount", "Order status"];
  constructor(
    private _orderService: OrderService,
    private _dialog: MatDialog,
    private _constants: Constants
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this._orderService.getUserOrder().subscribe((orders: Order[]) => {
      this.orders = orders;
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

  payOrder(order: Order) {
    let dialogRef = this._dialog.open(CardDialogComponent, {
      width: "400px",
      data: {
        totalPrice: order.amount,
        currency: order.currency
      }
    });
    dialogRef.afterClosed().subscribe((result: Token) => {
      if (!result) {
        return;
      }
      let payment: Payment = {
        amount: order.amount * 100,
        currencyString: this._constants.currencyStrings[order.currency],
        orderId: order.id,
        userEmail: result.card.name,
        tokenId: result.id
      } as Payment
      this._orderService.payOrder(payment).subscribe(() => {
        order.status = Status.Paid;
      });
    });
  }
}
