import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyToStringPipe } from 'src/app/helpers/pipes/currencyToStringPipe';
import { PrintingEditionTypeToStringPipe } from 'src/app/helpers/pipes/printingEditionTypeToStringPipe';
import { PrintingEditionTypeStringToEnumPipe } from 'src/app/helpers/pipes/printingEditionTypeStringToEnum';
import { CurrencyStringToEnumPipe } from 'src/app/helpers/pipes/currencyStringToEnumPipe';
import { OrderStatusToStringPipe } from 'src/app/helpers/pipes/orderStatusToStringPipe';
import { OrderStatusStringToEnumPipe } from 'src/app/helpers/pipes/orderStatusStringToEnumPipe';



@NgModule({
  declarations: [
    CurrencyToStringPipe,
    PrintingEditionTypeToStringPipe,
    PrintingEditionTypeStringToEnumPipe,
    CurrencyStringToEnumPipe,
    OrderStatusToStringPipe,
    OrderStatusStringToEnumPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyToStringPipe,
    PrintingEditionTypeToStringPipe,
    PrintingEditionTypeStringToEnumPipe,
    CurrencyStringToEnumPipe,
    OrderStatusToStringPipe,
    OrderStatusStringToEnumPipe
  ]
})
export class PipeModule { }
