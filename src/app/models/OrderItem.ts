import { PrintingEdition } from './PrintingEdition';

export class OrderItem {
    public printingEditionId: string;
    public orderId: string;
    public amount: number;
    public count: number;
    public printingEdition: PrintingEdition;
}