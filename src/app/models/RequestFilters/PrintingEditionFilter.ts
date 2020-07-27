import { BaseFilter } from './BaseFilter';
import { PrintingEditionType, Currency } from 'src/app/enums/enums';

export class PrintingEditionFilter extends BaseFilter{
    types: PrintingEditionType[];
    maxPrice: number;
    minPrice: number;
    searchString: string;
    currencies: Currency[];
}