import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem } from 'src/app/models/OrderItem';

@Component({
  selector: 'app-printing-edition-details',
  templateUrl: './printing-edition-details.component.html',
  styleUrls: ['./printing-edition-details.component.css']
})
export class PrintingEditionDetailsComponent implements OnInit {

  public product: PrintingEdition;
  public orderItem: OrderItem;

  constructor(
    private _route: ActivatedRoute,
    private _peService: PrintingEditionService,
    private _cartService: CartService
  ) {
    this.product = new PrintingEdition;
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      let productId = params.get("id");
      this._peService.getById(productId).subscribe((data: PrintingEdition) => {
        this.product = data;
        this.orderItem = {
          count: 1
        } as OrderItem;
      });
    });
  }

  addToCart(): void {
    let orderItem: OrderItem = {
      count: this.orderItem.count,
      amount: this.product.price * this.orderItem.count,
      printingEditionId: this.product.id
    } as OrderItem;
    this._cartService.addToCart(orderItem);
  }
}
