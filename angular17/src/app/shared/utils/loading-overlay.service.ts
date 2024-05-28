import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {

  isLoading = signal<boolean>(false);

  showLoadingOverlay(): void {
    this.isLoading.set(true);
  }

  hideLoadingOverlay(): void {
    this.isLoading.set(false);
  }

}

