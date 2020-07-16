import { BaseModel } from './BaseModel';
import { Currency, PrintingEditionType } from '../enums/enums';
import { Author } from './Author';

export class PrintingEdition extends BaseModel {
    public title: string;
    public description: string;
    public price: number;
    public currency: Currency;
    public type: PrintingEditionType;
    public authors: Author[];
}