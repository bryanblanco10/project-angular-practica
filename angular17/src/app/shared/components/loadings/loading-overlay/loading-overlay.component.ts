import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingOverlayService } from '@utils/loading-overlay.service';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingOverlayComponent {
  loadingOverlay = inject(LoadingOverlayService).isLoading;
}
