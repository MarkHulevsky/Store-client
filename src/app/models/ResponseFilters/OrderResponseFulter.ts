import { BaseResponseFilter } from './BaseResponseFilter';
import { Order } from '../Order';

export class OrderResponseFilter extends BaseResponseFilter {
    public orders: Order[];
}