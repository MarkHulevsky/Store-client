import { BaseModel } from './BaseModel';
import { CurrencyType, PrintingEditionType } from '../enums/enums';
import { Author } from './Author';

export class PrintingEdition extends BaseModel {
    public title: string;
    public description: string;
    public price: number;
    public currency: CurrencyType;
    public type: PrintingEditionType;
    public authors: Author[];
}