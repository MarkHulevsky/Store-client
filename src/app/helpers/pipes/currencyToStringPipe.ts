import { Pipe, PipeTransform } from "@angular/core";
import { Constants } from 'src/app/models/constants/constants';

@Pipe({
    name: "currencyToString"
})
export class CurrencyToStringPipe implements PipeTransform {
    constructor(private _constants: Constants) {}
    
    public transform(value: number) {
        return this._constants.CURRENCY_TYPE_STRINGS[value - 1];
    }
}