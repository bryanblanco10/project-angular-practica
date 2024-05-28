import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product: Product = {
    id: 0,
    image: '',
    title: '',
    price: 0,
    category: '',
    description: '',
  };
  @Output() addProductCard = new EventEmitter<Product>();
  @Output() showDetail = new EventEmitter<number>();

  addProduct() {
    this.addProductCard.emit(this.product);
  }

  onShowDetail() {
    this.showDetail.emit(this.product.id);
  }
}
