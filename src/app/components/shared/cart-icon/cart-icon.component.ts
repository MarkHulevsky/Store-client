import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem } from 'src/app/models/OrderItem';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../../cart/dialogs/cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {

  public count: number;
  private _orderItems: OrderItem[] = [];
  constructor(
    private _cartService: CartService,
    private _dialog: MatDialog
    ) { 
    _cartService.count.subscribe((data: number) => {
      this.count = data;
    });
  }

  ngOnInit(): void {
    this.count = this._cartService.orderItems.length;
  }

  openCart(): void {
    this._orderItems = this._cartService.orderItems;
    this._dialog.open(CartDialogComponent, {
      width: "800px",
      data: this._orderItems
    });
  }
}
