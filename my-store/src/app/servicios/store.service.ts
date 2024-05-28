import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private shoppingCardproducts: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();

  addProduct(product: Product) {
    this.shoppingCardproducts.push(product);
    this.myCart.next(this.shoppingCardproducts);
  }

  getShoppingCart() {
    return this.shoppingCardproducts;
  }

  getTotal() {
    return this.shoppingCardproducts.reduce((sum, item) => sum + item.price, 0);
  }
}
