import { BaseModel } from './BaseModel';
import { OrderItem } from './OrderItem';

export class Order extends BaseModel {
    public orderItems: OrderItem[];
}