import { Pipe, PipeTransform } from "@angular/core";
import { OrderStatus } from 'src/app/enums/enums';

@Pipe({
    name: "orderStatusStringToEnum"
})
export class OrderStatusStringToEnumPipe implements PipeTransform {

    public transform(value: string): OrderStatus {
        return OrderStatus[value];
    }
} 