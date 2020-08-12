import { OrderItem } from 'src/app/models/OrderItem';
import { Subject } from 'rxjs';

export interface ICartService {
    addToCart(orderItem: OrderItem): void;
    removeFromCart(orderItem: OrderItem): boolean;
    clear(): void;
    orderItems: OrderItem[];
    count: Subject<number>;
}