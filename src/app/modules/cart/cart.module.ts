import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDialogComponent } from 'src/app/components/cart/dialogs/card-dialog/card-dialog.component';
import { PipeModule } from '../pipe/pipe.module';
import { CartDialogComponent } from 'src/app/components/cart/dialogs/cart-dialog/cart-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment.prod';
import { TransactionSucceededDialogComponent } from 'src/app/components/cart/dialogs/transaction-succeeded-dialog/transaction-succeeded-dialog.component';

@NgModule({
  declarations: [
    CardDialogComponent,
    CartDialogComponent,
    TransactionSucceededDialogComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.publishableKey)
  ]
})
export class CartModule { }
