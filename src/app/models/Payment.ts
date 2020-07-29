import { BaseModel } from './BaseModel';

export class Payment extends BaseModel {
    public orderId: string;
    public userEmail: string;
    public amount: number;
    public tokenId: string;
    public currencyString: string;
}