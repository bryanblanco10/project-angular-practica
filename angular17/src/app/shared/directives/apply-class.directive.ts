import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appApplyClass]',
  standalone: true,
})
export class ApplyClassDirective implements OnInit {

  @Input('appApplyClass') classElement!: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.classElement)
      this.renderer.addClass(this.elementRef.nativeElement, this.classElement);
  }
}
