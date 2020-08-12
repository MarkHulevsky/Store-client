import { PrintingEditionFilter } from 'src/app/models/RequestFilters/PrintingEditionFilter';
import { Observable } from 'rxjs';
import { PrintingEditionResponseFilter } from 'src/app/models/ResponseFilters/PrintingEditionResponseFilter';
import { PrintingEdition } from 'src/app/models/PrintingEdition';

export interface IPrintingEditionService {
    getFiltred(peFilter: PrintingEditionFilter): Observable<PrintingEditionResponseFilter>;
    add(printingEdition: PrintingEdition): Observable<any>;
    delete(peId: string): Observable<any>;
    edit(pe: PrintingEdition): Observable<any>;
    getById(id: string): Observable<PrintingEdition>;
    convertCurrency(currentCurrency: string, newCurrency: string): Observable<number>;
} 