import { BaseModel } from './BaseModel';
import { Order } from './Order';

export class Cart extends BaseModel {
    public order: Order;
    public userId: string;
}