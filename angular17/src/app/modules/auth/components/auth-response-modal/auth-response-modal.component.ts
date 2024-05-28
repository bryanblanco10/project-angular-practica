import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FaqModalComponent } from '@layouts/faq/faq-modal/faq-modal.component';
import { AppRoutePaths, AuthRoutePaths, EmailRoutePaths, ModalClassName } from '@models/enums';
import { MODAL_CONFIG } from '@models/constants';
import { WebviewManagementService } from '@utils/webview-management.service';

import { AuthCustomCode, AuthResultCode } from '@auth/models/enums/auth.enum';

@Component({
  selector: 'app-auth-response-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-response-modal.component.html',
  styleUrls: ['./auth-response-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthResponseModalComponent {
  result!: number;
  emailSupport: string = EmailRoutePaths.SUPPORT;
  private _activeModal = inject(NgbActiveModal);
  private _modalService = inject(NgbModal);
  private _webviewService = inject(WebviewManagementService);

  get isEmailNotExist(): boolean {
    return this.result === AuthResultCode.USER_NOT_FOUND;
  }

  get isStartForgotPasswordSuccess(): boolean {
    return this.result === AuthCustomCode.FORGOT_PASSWORD_OK;
  }

  get isEmailExpiredToken(): boolean {
    return this.result === AuthResultCode.TOKEN_EXPIRED;
  }

  get isResetPasswordSuccess(): boolean {
    return this.result === AuthCustomCode.RESET_PASSWORD_SUCCESS;
  }

  get isMigratedAccountSuccess(): boolean {
    return this.result === AuthCustomCode.USER_HAS_BEEN_MIGRATED;
  }

  dismiss(): void { 
    this._activeModal.dismiss(true);
  }

  close(option = ''): void {
    this._activeModal.close(option);
  }

  redirecToRegister(): void {
    this.close(AuthRoutePaths.REGISTER);
  }

  redirecToHome(): void {
    this.close(AppRoutePaths.HOME);
  }

  redirecToFaq(): void { 
    this._webviewService.isWebview 
      ? this._modalService.open(FaqModalComponent, { ...MODAL_CONFIG, modalDialogClass: ModalClassName.FAQ })
      : window.open(AppRoutePaths.FAQ, '_blank');
  }
}
