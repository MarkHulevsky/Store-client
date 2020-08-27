import { BaseFilter } from './BaseFilter';
import { OrderStatus } from 'src/app/enums/enums';

export class OrderFilter extends BaseFilter {
    public sortPropertyName: string;
    public orderStatuses: OrderStatus[];
}