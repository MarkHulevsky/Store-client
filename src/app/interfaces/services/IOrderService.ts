import { Cart } from 'src/app/models/Cart';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/Payment';
import { Order } from 'src/app/models/Order';
import { OrderRequestModel } from 'src/app/models/RequestModels/OrderRequestModel';
import { OrderResponseModel } from 'src/app/models/ResponseModels/OrderResponseModel';

export interface IOrderService {
    create(cart: Cart): Observable<any>;
    payOrder(payment: Payment): Observable<any>;
    getUserOrder(): Observable<Order[]>;
    getFiltred(filter: OrderRequestModel): Observable<OrderResponseModel>;
}