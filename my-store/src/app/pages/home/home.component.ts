import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/servicios/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private productsService: ProductsService) {}
  ngOnInit() {
    this.productsService
      .getProducts()
      .subscribe((data) => (this.products = data));
  }
}
