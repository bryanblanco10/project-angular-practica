import { Directive, ElementRef, HostListener,
  Input, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appCheckElementIsVisible]',
  standalone: true
})
export class CheckElementIsVisibleDirective implements OnInit, OnDestroy {

  @Input('appCheckElementIsVisible') classElement!: string;
  private timeId!: unknown;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.changeClassForElement();
  }

  ngOnDestroy(): void {
    if (this.timeId)
      clearTimeout(this.timeId as number);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.changeClassForElement();
  }

  changeClassForElement(): void {
    this.timeId = setTimeout(() => {
      this.isInViewport()
        ? this.renderer.removeClass(this.elementRef.nativeElement, this.classElement)
        : this.renderer.addClass(this.elementRef.nativeElement, this.classElement);
    }, 100);
  }

  isInViewport(): boolean {
    const RECT = this.elementRef.nativeElement.getBoundingClientRect();
    return (
      RECT.top >= 0 &&
      RECT.left >= 0 &&
      RECT.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      RECT.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
