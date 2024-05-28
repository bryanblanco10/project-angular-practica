import { Component, Input } from '@angular/core';
import { CreateProductDTO, Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/servicios/products.service';
import { StoreService } from 'src/app/servicios/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  myShoppingCart: Product[] = [];
  total = 0;
  today = new Date();
  date = new Date(1996, 7, 27);
  isShowDetail = false;
  detail: Product = {
    id: 0,
    image: '',
    title: '',
    price: 0,
    category: '',
    description: '',
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  addProductShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleDetail() {
    this.isShowDetail = !this.isShowDetail;
  }

  showDetail(productId: number) {
    this.toggleDetail();
    this.productsService.getProduct(productId).subscribe(
      (data) => {
        this.detail = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createProduct() {
    const product: CreateProductDTO = {
      categoryId: 1,
      description: 'dd',
      image:
        'https://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/3.png',
      price: 12000,
      title: 'product one',
    };
    this.productsService
      .createProduct(product)
      .subscribe((data) => this.products.push(data));
  }
}
