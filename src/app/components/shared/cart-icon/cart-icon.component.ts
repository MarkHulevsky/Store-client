import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {

  public count: number;

  constructor(private _cartService: CartService) { 
    _cartService.count.subscribe((data: number) => {
      this.count = data;
    });
  }

  ngOnInit(): void {
    this.count = this._cartService.orderItems.length;
  }

}
