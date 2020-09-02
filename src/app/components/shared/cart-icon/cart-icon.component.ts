import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem } from 'src/app/models/OrderItem';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../../cart/dialogs/cart-dialog/cart-dialog.component';
import { ICartService } from 'src/app/interfaces/services/ICartService';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {

  public count: number;
  private _orderItems: OrderItem[];
  constructor(
    @Inject(CartService) private _cartService: ICartService,
    private _dialog: MatDialog
  ) {
    this._orderItems = [];
    _cartService.count.subscribe((count: number) => {
      this.count = count;
    });
  }

  ngOnInit(): void {
    this.count = this._cartService.orderItems.length;
  }

  public openCart(): void {
    this._orderItems = this._cartService.orderItems;
    this._dialog.open(CartDialogComponent, {
      width: "800px",
      data: this._orderItems
    });
  }
}
