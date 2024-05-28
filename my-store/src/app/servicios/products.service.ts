import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://fakestoreapi.com/products';
  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}`).pipe(
      retry(3),
      map((products) =>
        products.map((product) => {
          return {
            ...product,
            taxes: 0.19 * product.price,
          };
        })
      )
    );
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(data: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}`, data);
  }

  updateProduct(id: number, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }
}
