import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/servicios/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isVisible = false;
  counter = 0;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  onToggleMenu() {
    this.isVisible = !this.isVisible;
  }
}
