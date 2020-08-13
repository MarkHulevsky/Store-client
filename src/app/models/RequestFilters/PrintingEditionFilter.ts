import { BaseFilter } from './BaseFilter';
import { PrintingEditionType } from 'src/app/enums/enums';

export class PrintingEditionFilter extends BaseFilter{
    types: PrintingEditionType[];
    maxPrice: number;
    minPrice: number;
    searchString: string;
}