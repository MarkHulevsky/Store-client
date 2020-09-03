import { PrintingEditionRequestModel } from 'src/app/models/RequestModels/PrintingEditionRequestModel';
import { Observable } from 'rxjs';
import { PrintingEditionResponseModel } from 'src/app/models/ResponseModels/PrintingEditionResponseModel';
import { PrintingEdition } from 'src/app/models/PrintingEdition';

export interface IPrintingEditionService {
    getFiltred(peFilter: PrintingEditionRequestModel): Observable<PrintingEditionResponseModel>;
    add(printingEdition: PrintingEdition): Observable<any>;
    delete(peId: string): Observable<any>;
    edit(pe: PrintingEdition): Observable<any>;
    getById(id: string): Observable<PrintingEdition>;
    convertCurrency(currentCurrency: string, newCurrency: string): Observable<number>;
} 