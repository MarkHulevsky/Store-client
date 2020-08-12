import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { PrintingEdition } from '../models/PrintingEdition';
import { PrintingEditionFilter } from '../models/RequestFilters/PrintingEditionFilter';
import { PrintingEditionResponseFilter } from '../models/ResponseFilters/PrintingEditionResponseFilter';
import { IPrintingEditionService } from '../interfaces/services/IPrintingEditionService';

@Injectable({
  providedIn: 'root'
})
export class PrintingEditionService implements IPrintingEditionService {

  constructor(
    private _http: HttpClient
  ) { }

  getFiltred(peFilter: PrintingEditionFilter): Observable<PrintingEditionResponseFilter> {
    return this._http.post<PrintingEditionResponseFilter>(
      `${environment.apiUrl}/api/PrintingEdition/GetFiltred`,
      peFilter);
  }

  add(printingEdition: PrintingEdition): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/PrintingEdition/Add`, printingEdition);
  }

  delete(peId: string): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/api/PrintingEdition/Delete?id=${peId}`);
  }

  edit(pe: PrintingEdition): Observable<any> {
    return this._http.put(`${environment.apiUrl}/api/PrintingEdition/Edit`, pe);
  }

  getById(id: string): Observable<PrintingEdition> {
    return this._http.get<PrintingEdition>(`${environment.apiUrl}/api/PrintingEdition/GetById?id=${id}`);
  }

  convertCurrency(currentCurrency: string, newCurrency: string): Observable<number> {
    return this._http.get<number>(`${environment.apiUrl}/api/PrintingEdition/ConvertCurrency`+
    `/${currentCurrency}/${newCurrency}`);
  }
}
