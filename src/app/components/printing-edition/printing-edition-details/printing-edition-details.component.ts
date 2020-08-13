import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintingEdition } from 'src/app/models/PrintingEdition';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem } from 'src/app/models/OrderItem';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IPrintingEditionService } from 'src/app/interfaces/services/IPrintingEditionService';
import { ICartService } from 'src/app/interfaces/services/ICartService';
import { IAuthenticationService } from 'src/app/interfaces/services/IAuthenticationService';

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
    @Inject(PrintingEditionService) private _peService: IPrintingEditionService,
    @Inject(CartService) private _cartService: ICartService,
    @Inject(AuthenticationService) private _authService: IAuthenticationService
  ) {
    this.product = new PrintingEdition;
    _authService.userStatusCheck();
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      let productId = params.get("id");
      this._peService.getById(productId).subscribe((printingEdition: PrintingEdition) => {
        this.product = printingEdition;
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
    if (orderItem.count < 1)
    {
      this.orderItem.count = 1;
      return;
    }
    this._cartService.addToCart(orderItem);
  }
}
