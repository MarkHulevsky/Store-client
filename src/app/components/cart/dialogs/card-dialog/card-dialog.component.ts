import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions, CreateTokenCardData } from '@stripe/stripe-js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { StorageHelper } from 'src/app/helpers/storage.helper';
import { Constants } from 'src/app/models/constants/constants';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements OnInit {

  @ViewChild(StripeCardComponent) public card: StripeCardComponent;
  public stripeForm: FormGroup;

  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: 'white',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  public elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  constructor(
    private _stripeService: StripeService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _storageHelper: StorageHelper,
    private _constants: Constants
  ) {
    this.stripeForm = this._formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public pay(): void {
    let email = this._storageHelper.getItem(this._constants.STORAGE_EMAIL);
    this._stripeService.createToken(this.card.element, {
      name: email,
      currency: this._constants.CURRENCY_TYPE_STRINGS[this.data.currency],
    } as CreateTokenCardData).subscribe(result => {
      if (result.token) {
        this._dialogRef.close(result.token);
      }
    });
  }

}
