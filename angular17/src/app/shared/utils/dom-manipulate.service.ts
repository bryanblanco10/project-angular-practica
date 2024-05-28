import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomManipulateService {

  private _renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  addBodyClass(className: string): void {
    if (typeof window !== 'undefined')
      this._renderer.addClass(this.document.body, className);
  }

  removeBodyClass(className: string): void {
    if (typeof window !== 'undefined')
      this._renderer.removeClass(this.document.body, className);
  }

  goToTop(): void {
    if (typeof window !== 'undefined')
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
