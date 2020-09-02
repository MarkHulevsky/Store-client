import { Pipe, PipeTransform } from "@angular/core";
import { Constants } from 'src/app/models/constants/constants';

@Pipe({
    name: "peTypeToString"
})
export class PrintingEditionTypeToStringPipe implements PipeTransform {
    constructor(private _constants: Constants) {}
    
    public transform(value: number) {
        return this._constants.PRINTING_EDITION_TYPE_STRINGS[value - 1];
    }
}