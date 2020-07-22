import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { PrintingEdition } from '../models/PrintingEdition';
import { PrintingEditionFilter } from '../models/RequestFilters/PrintingEditionFilter';
import { PrintingEditionResponseFilter } from '../models/ResponseFilters/PrintingEditionResponseFilter';

@Injectable({
  providedIn: 'root'
})
export class PrintingEditionService {

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
}
