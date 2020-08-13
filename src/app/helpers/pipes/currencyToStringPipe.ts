import { Pipe, PipeTransform } from "@angular/core";
import { Constants } from 'src/app/models/constants/constants';

@Pipe({
    name: "currencyToString"
})
export class CurrencyToStringPipe implements PipeTransform {
    constructor(private _constants: Constants) {}
    
    transform(value: number) {
        return this._constants.currencyStrings[value - 1];
    }
}