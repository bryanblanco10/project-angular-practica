import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Bryan';
  img = 'https://cataas.com/cat';
  isDisabled = true;
  names: string[] = ['Bryan', 'Messi', 'Iniesta'];
  box = {
    width: 100,
    height: 100,
    background: 'red',
  };
  register = {
    name: '',
    email: '',
    password: '',
  };
  imgParent =
    'https://play-lh.googleusercontent.com/ue88El81ZXdm4YPNcsn3No7VYnh9ZEWwJYNbCTxM6_K1cLfpezsLS6fOxwQR1Z9kEms';

  products: Product[] = [];
  isImg = true;

  toggleBtn() {
    this.isDisabled = !this.isDisabled;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  onKeyUp(event: Event) {
    const element = event.target as HTMLInputElement;
    this.name = element.value;
  }

  onRegister() {
    console.log(this.register);
  }

  onLoaded(event: string) {
    console.log('Recibido mi coronel', event);
  }

  onToggleImag() {
    this.isImg = !this.isImg;
  }

  // constructor(private productsService: ProductsService) {}

  // ngOnInit() {
  //   this.productsService
  //     .getProducts()
  //     .subscribe((data) => (this.products = data));
  // }
}
