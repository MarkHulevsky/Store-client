import { BaseRequestModel } from './BaseRequestModel';
import { PrintingEditionType } from 'src/app/enums/enums';

export class PrintingEditionRequestModel extends BaseRequestModel{
    types: PrintingEditionType[];
    maxPrice: number;
    minPrice: number;
    searchString: string;
}