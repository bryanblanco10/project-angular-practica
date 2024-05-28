import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_CONFIG } from '@models/constants';
import { ApiErrorModalComponent } from '@components/modals/api-error-modal/api-error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  constructor(private _modalService: NgbModal) { }

  showModalError(message: string, showErrorIcon = true): void {
    const modalRef = this._modalService.open(ApiErrorModalComponent, { ...MODAL_CONFIG });
    modalRef.componentInstance.errorMessage = message;
    modalRef.componentInstance.showErrorIcon = showErrorIcon;
  }

}
