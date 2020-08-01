import { BaseModel } from './BaseModel';
import { OrderItem } from './OrderItem';
import { Status, Currency } from '../enums/enums';

export class Order extends BaseModel {
    public creationDate: Date;
    public status: Status;
    public orderItems: OrderItem[];
    public amount: number;
    public currency: Currency;
}