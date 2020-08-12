import { Cart } from 'src/app/models/Cart';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/Payment';
import { Order } from 'src/app/models/Order';
import { OrderFilter } from 'src/app/models/RequestFilters/OrderFilter';
import { OrderResponseFilter } from 'src/app/models/ResponseFilters/OrderResponseFulter';

export interface IOrderService {
    create(cart: Cart): Observable<any>;
    payOrder(payment: Payment): Observable<any>;
    getUserOrder(): Observable<Order[]>;
    getFiltred(filter: OrderFilter): Observable<OrderResponseFilter>;
}