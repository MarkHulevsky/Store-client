import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Cart } from '../models/Cart';
import { Observable } from 'rxjs';
import { Payment } from '../models/Payment';
import { Order } from '../models/Order';
import { OrderResponseFilter } from '../models/ResponseFilters/OrderResponseFulter';
import { OrderFilter } from '../models/RequestFilters/OrderFilter';
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
  
  getUserOrder(): Observable<Order[]> {
    return this._http.get<Order[]>(`${environment.apiUrl}/api/Order/GetUserOrders`);
  }

  getFiltred(filter: OrderFilter): Observable<OrderResponseFilter> {
    return this._http.post<OrderResponseFilter>(`${environment.apiUrl}/api/Order/GetFiltred`, filter);
  } 
}
