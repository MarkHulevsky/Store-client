import { Pipe, PipeTransform } from "@angular/core";
import { Currency } from 'src/app/enums/enums';

@Pipe({
    name: "currencyStringToEnum"
})
export class CurrencyStringToEnumPipe implements PipeTransform {
    transform(value: string) {
        return Currency[value];
    }
} 