import { Pipe, PipeTransform } from "@angular/core";
import { Constants } from 'src/app/models/constants/constants';

@Pipe({
    name: "peTypeToString"
})
export class PrintingEditionTypeToStringPipe implements PipeTransform {
    constructor(private _constants: Constants) {}
    
    transform(value: number) {
        return this._constants.printingEditionTypeStrings[value - 1];
    }
}