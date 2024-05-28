import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingOverlayComponent } from '@components/loadings/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingOverlayComponent],
  template: `
    <router-outlet></router-outlet>
    <app-loading-overlay></app-loading-overlay>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
