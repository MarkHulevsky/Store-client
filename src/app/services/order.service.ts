import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Cart } from '../models/Cart';
import { Observable } from 'rxjs';
import { Payment } from '../models/Payment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  create(cart: Cart): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/Order/Create`, cart);
  }

  payOrder(payment: Payment): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/Order/Pay`, payment);
  }
}
