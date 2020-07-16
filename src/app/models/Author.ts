import { BaseModel } from './BaseModel';
import { PrintingEdition } from './PrintingEdition';

export class Author extends BaseModel {
    public name: string;
    public printingEditions: PrintingEdition[];
}