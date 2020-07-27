import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyToStringPipe } from 'src/app/helpers/pipes/currencyToStringPipe';
import { PrintingEditionTypeToStringPipe } from 'src/app/helpers/pipes/printingEditionTypeToStringPipe';
import { PrintingEditionTypeStringToEnumPipe } from 'src/app/helpers/pipes/printingEditionTypeStringToEnum';
import { CurrencyStringToEnumPipe } from 'src/app/helpers/pipes/currencyStringToEnumPipe';



@NgModule({
  declarations: [
    CurrencyToStringPipe,
    PrintingEditionTypeToStringPipe,
    PrintingEditionTypeStringToEnumPipe,
    CurrencyStringToEnumPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyToStringPipe,
    PrintingEditionTypeToStringPipe,
    PrintingEditionTypeStringToEnumPipe,
    CurrencyStringToEnumPipe,
  ]
})
export class PipeModule { }
