import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ApplyBgColorDirective } from '@app/shared/directives/apply-bgcolor.directive';

@Component({
  selector: 'app-loading-bounce',
  standalone: true,
  imports: [NgIf, ApplyBgColorDirective],
  templateUrl: './loading-bounce.component.html',
  styleUrls: ['./loading-bounce.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBounceComponent {
  @Input() isLoading!: boolean;
  @Input() color = '#4B5881';
}
