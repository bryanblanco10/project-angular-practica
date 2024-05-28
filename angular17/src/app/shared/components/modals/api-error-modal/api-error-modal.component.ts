import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-api-error-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-error-modal.component.html',
  styleUrls: ['./api-error-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiErrorModalComponent {

  private _activeModal = inject(NgbActiveModal);
  showErrorIcon = false;
  errorMessage = 'Parece que hubo un error. Por favor vuelva a intentarlo';

  dismiss(): void { 
    this._activeModal.dismiss();
  }

}
