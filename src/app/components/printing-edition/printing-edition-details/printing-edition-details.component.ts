import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem } from 'src/app/models/OrderItem';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-printing-edition-details',
  templateUrl: './printing-edition-details.component.html',
  styleUrls: ['./printing-edition-details.component.css']
})
export class PrintingEditionDetailsComponent implements OnInit {

  public product: PrintingEdition;
  public orderItem: OrderItem;
  private isAuthorized: boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _peService: PrintingEditionService,
    private _cartService: CartService,
    private _authService: AuthenticationService
  ) {
    this.product = new PrintingEdition;
    _authService.userStatusCheck();
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
    this._authService.isAuthorized.subscribe((data: boolean) => {
      if (data !== null) {
        this.isAuthorized = data;
      }
    })
  }

  addToCart(): void {
    if (this.isAuthorized == false) {
      this._router.navigate(['account/sign-in']);
    }
    let orderItem: OrderItem = {
      count: this.orderItem.count,
      amount: this.product.price * this.orderItem.count,
      printingEditionId: this.product.id
    } as OrderItem;
    this._cartService.addToCart(orderItem);
  }
}
