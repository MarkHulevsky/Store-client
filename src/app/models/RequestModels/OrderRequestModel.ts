import { BaseRequestModel } from './BaseRequestModel';
import { OrderStatus } from 'src/app/enums/enums';

export class OrderRequestModel extends BaseRequestModel {
    public sortPropertyName: string;
    public orderStatuses: OrderStatus[];
}