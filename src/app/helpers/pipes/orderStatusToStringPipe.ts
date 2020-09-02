import { Pipe, PipeTransform } from "@angular/core";
import { Constants } from 'src/app/models/constants/constants';

@Pipe({
    name: "orderStatusToString"
})
export class OrderStatusToStringPipe implements PipeTransform {
    constructor(private _constants: Constants) {

    }
    public transform(value: number) {
        return this._constants.ORDER_STATUS_STRINGS[value - 1];
    }
}