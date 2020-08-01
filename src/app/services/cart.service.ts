import { Injectable } from '@angular/core';
import { OrderItem } from '../models/OrderItem';
import { Subject } from 'rxjs';
import { StorageHelper } from '../helpers/storage.helper';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _orderItems: OrderItem[] = [];
  private _count: Subject<number> = new Subject<number>();

  constructor(private _storageHelper: StorageHelper) {
  }

  addToCart(orderItem: OrderItem): void {
    if (this._orderItems === null) {
      this._orderItems = [];
    }
    this._orderItems.push(orderItem);
    this._storageHelper.setItem('cart', JSON.stringify(this._orderItems));
    this.count.next(this.orderItems.length);
  }

  removeFromCart(orderItem: OrderItem): boolean {
    this._orderItems = JSON.parse(this._storageHelper.getItem('cart'));
    if (this._orderItems !== null) {
      let index = this.indexOf(orderItem);
      if (index > -1) {
        this._orderItems.splice(index, 1);
        this._storageHelper.setItem('cart', JSON.stringify(this._orderItems));
        this.count.next(this._orderItems.length);
        return true
      }
    }
    return false;
  }

  clear() {
    this._orderItems = [];
    this._storageHelper.setItem('cart', JSON.stringify(this._orderItems));
    this.count.next(this.orderItems.length);
  }

  public get orderItems(): OrderItem[] {
    this._orderItems = JSON.parse(this._storageHelper.getItem('cart'));
    if (this._orderItems !== null) {
      return this._orderItems;
    }
    return [];
  }

  public get count(): Subject<number> {
    return this._count; 
  }

  private indexOf(orderItem: OrderItem) {
    for (var i = 0; i < this._orderItems.length; i++) {
      if (this._orderItems[i].printingEditionId == orderItem.printingEditionId 
          && this.orderItems[i].amount == orderItem.amount 
          && this._orderItems[i].count == orderItem.count) {
          return i;
      }
  }
  return -1;
  }
}
