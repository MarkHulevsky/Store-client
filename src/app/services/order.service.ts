import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Cart } from '../models/Cart';
import { Observable } from 'rxjs';
import { Payment } from '../models/Payment';
import { Order } from '../models/Order';
import { OrderResponseModel } from '../models/ResponseModels/OrderResponseModel';
import { OrderRequestModel } from '../models/RequestModels/OrderRequestModel';
import { IOrderService } from '../interfaces/services/IOrderService';
@Injectable({
  providedIn: 'root'
})
export class OrderService implements IOrderService {

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

  getFiltred(filter: OrderRequestModel): Observable<OrderResponseModel> {
    return this._http.post<OrderResponseModel>(`${environment.apiUrl}/api/Order/GetFiltred`, filter);
  } 
}
