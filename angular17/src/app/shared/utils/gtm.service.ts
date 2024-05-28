import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { isEmpty } from '@helpers/object-utils.helper';

interface WindowWithGtmDataLayer {
  dataLayer?: unknown[];
}

@Injectable({
  providedIn: 'root',
})
export class GtmService {

  constructor(private windowRef: WindowRefService) { }

  get nativeWindow(): WindowWithGtmDataLayer  {
    return  this.windowRef.nativeWindow as WindowWithGtmDataLayer;
  }

  sendDataToGTM<T extends object>(obj: T) {
    if (!isEmpty(obj) && this.nativeWindow.dataLayer) {
      this.nativeWindow.dataLayer.push(obj);
    }
  }
}
