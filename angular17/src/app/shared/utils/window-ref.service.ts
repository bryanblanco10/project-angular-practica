import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowRefService {
  get nativeWindow(): Window {
    return window;
  }
}
