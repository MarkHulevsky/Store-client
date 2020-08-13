import { Component, OnInit, Inject } from '@angular/core';
import { CartIconComponent } from 'src/app/components/shared/cart-icon/cart-icon.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderItem } from 'src/app/models/OrderItem';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Cart } from 'src/app/models/Cart';
import { Order } from 'src/app/models/Order';
import { Router } from '@angular/router';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';
import { Currency, Status } from 'src/app/enums/enums';
import { Token } from '@stripe/stripe-js';
import { Payment } from 'src/app/models/Payment';
import { Constants } from 'src/app/models/constants/constants';
import { IOrderService } from 'src/app/interfaces/services/IOrderService';
import { ICartService } from 'src/app/interfaces/services/ICartService';
import { IPrintingEditionService } from 'src/app/interfaces/services/IPrintingEditionService';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {

  public displayedColumns = ['product'];
  public totalPrice: number = 0;
  public currency: Currency = Currency.USD;
  constructor(
    private _dialogRef: MatDialogRef<CartIconComponent>,
    @Inject(MAT_DIALOG_DATA) public orderItems: OrderItem[],
    @Inject(PrintingEditionService) private _peService: IPrintingEditionService,
    @Inject(CartService) private _cartService: ICartService,
    @Inject(OrderService) private _orderService: IOrderService,
    private _router: Router,
    private _dialog: MatDialog,
    private _constants: Constants
  ) {
  }

  ngOnInit(): void {
    this.getPrintingEditions();
  }

  async getPrintingEditions(): Promise<void> {

    for (let i = 0; i < this.orderItems.length; i++) {
      let pe = await this._peService.getById(this.orderItems[i].printingEditionId).toPromise();
      this.orderItems[i].printingEdition = pe;
      await this.convertCurrency(this.orderItems[i], this.currency);
      this.totalPrice += this.orderItems[i].printingEdition.price * this.orderItems[i].count;
    }
  }

  qtyChanged(orderItem: OrderItem): void {
    if (orderItem.count < 1) {
        orderItem.count = 1;
    }
    let index = this.orderItems.indexOf(orderItem);
    this.orderItems[index].amount = this.orderItems[index].printingEdition.price * this.orderItems[index].count;
    this.totalPrice = 0;
    this.orderItems.forEach(_orderItem => {
      this.totalPrice += _orderItem.printingEdition.price * _orderItem.count;
    });
  }

  removeItem(orderItem: OrderItem): void {
    if (this._cartService.removeFromCart(orderItem)) {
      let index = this.orderItems.indexOf(orderItem);
      if (index > -1) {
        this.orderItems.splice(index, 1);
        this.totalPrice -= orderItem.amount;
      }
    }
  }

  buy(): void {
    if (this.orderItems.length == 0) {
      this._dialogRef.close();
      this._router.navigate(["home"]);
      return;
    }
    let cart: Cart = {
      order: {
        orderItems: this.orderItems,
        status: Status.Unpaid
      } as Order,
    } as Cart;
    let orderId: string;
    this._orderService.create(cart).subscribe((data: Order) => {
      orderId = data.id;
      this._dialogRef.close();
      let dialogRef = this._dialog.open(CardDialogComponent, {
        width: "400px",
        data: {
          totalPrice: this.totalPrice,
          currency: this.currency
        }
      });

      dialogRef.afterClosed().subscribe((result: Token) => {
        if (!result) {
          return;
        }
        let payment: Payment = {
          amount: this.totalPrice * 100,
          currencyString: this._constants.currencyStrings[this.currency],
          orderId: orderId,
          userEmail: result.card.name,
          tokenId: result.id
        } as Payment
        this._orderService.payOrder(payment).subscribe(() => {
          this._cartService.clear();
        });
      });
    });
  }

  cancel(): void {
    this._dialogRef.close();
  }

  async convertCurrency(orderItem: OrderItem, currency: Currency): Promise<void> {
    if (orderItem.printingEdition.currency === currency) {
      return;
    }
    let currencyString = this._constants.currencyStrings[currency];
    let currentCurrency = this._constants.currencyStrings[orderItem.printingEdition.currency];
    let rate = await this._peService.convertCurrency(currentCurrency, currencyString).toPromise();
    orderItem.printingEdition.price = Math.round(orderItem.printingEdition.price * rate);
    orderItem.printingEdition.currency = currency;
    orderItem.amount = orderItem.printingEdition.price * orderItem.count;
  }
}

