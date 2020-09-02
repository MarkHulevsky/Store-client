import { BaseResponseModel } from './BaseResponseModel';
import { PrintingEdition } from '../PrintingEdition';

export class PrintingEditionResponseModel extends BaseResponseModel {
    printingEditions: PrintingEdition[];
} 