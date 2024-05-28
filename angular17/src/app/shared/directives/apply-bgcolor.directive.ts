import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appApplyBgColor]',
  standalone: true
})
export class ApplyBgColorDirective implements OnInit {

  @Input('appApplyBgColor') color!: string;
  @HostBinding('style.backgroundColor') bgColor!: string;

  ngOnInit(): void {
    this.bgColor = this.color ?? '#FFF';
  }
}