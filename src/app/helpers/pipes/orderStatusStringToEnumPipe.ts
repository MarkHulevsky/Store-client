import { Pipe, PipeTransform } from "@angular/core";
import { Status } from 'src/app/enums/enums';

@Pipe({
    name: "orderStatusStringToEnum"
})
export class OrderStatusStringToEnumPipe implements PipeTransform {

    transform(value: string): Status {
        return Status[value];
    }
} 