import { BaseModel } from './BaseModel';
import { OrderItem } from './OrderItem';
import { OrderStatus, CurrencyType } from '../enums/enums';

export class Order extends BaseModel {
    public creationDate: Date;
    public status: OrderStatus;
    public orderItems: OrderItem[];
    public amount: number;
    public currency: CurrencyType;
}