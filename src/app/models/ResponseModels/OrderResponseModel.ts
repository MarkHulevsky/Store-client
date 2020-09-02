import { BaseResponseModel } from './BaseResponseModel';
import { Order } from '../Order';

export class OrderResponseModel extends BaseResponseModel {
    public orders: Order[];
}