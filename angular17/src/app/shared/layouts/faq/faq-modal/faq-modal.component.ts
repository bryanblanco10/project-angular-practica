import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FaqComponent } from '../faq.component';

@Component({
  selector: 'app-faq-modal',
  standalone: true,
  imports: [CommonModule, FaqComponent],
  templateUrl: './faq-modal.component.html',
  styleUrls: ['./faq-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqModalComponent {

  private _activeModal = inject(NgbActiveModal);

  dismiss(): void {
    this._activeModal.dismiss();
  }
}
