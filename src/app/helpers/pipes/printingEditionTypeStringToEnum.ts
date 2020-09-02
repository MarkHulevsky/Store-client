import { Pipe, PipeTransform } from "@angular/core";
import { PrintingEditionType } from '../../enums/enums';

@Pipe({
    name: "peStringToEnum"
})
export class PrintingEditionTypeStringToEnumPipe implements PipeTransform {

    public transform(value: string) {
        return PrintingEditionType[value];
    }
}