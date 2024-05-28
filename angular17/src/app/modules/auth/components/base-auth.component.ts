import { inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment as ENV } from '@environments/environment';
import { MODAL_CONFIG } from '@models/constants';
import { AppRoutePaths, ButtonClassName, EmailRoutePaths } from '@models/enums';
import { UserManagementService } from '@services/user-management.service';
import { GtmService } from '@utils/gtm.service';
import { WebviewManagementService } from '@utils/webview-management.service';
import { WebRedirectService } from '@utils/web-redirect.service';
import { ApiErrorModalComponent } from '@components/modals/api-error-modal/api-error-modal.component';

import { AuthTracking } from '@auth/models/interfaces/auth.interface';
import { AuthService } from '@auth/services/auth.service';
import { AuthResponseModalComponent } from './auth-response-modal/auth-response-modal.component';

export abstract class BaseAuth {
  protected readonly _authService = inject(AuthService);
  protected readonly _gtmService = inject(GtmService);
  protected readonly _userManagement = inject(UserManagementService);
  protected readonly _webviewService = inject(WebviewManagementService);
  protected readonly _webRedirect = inject(WebRedirectService);
  protected readonly _router = inject(Router);
  protected readonly _activatedRoute = inject(ActivatedRoute);
  protected readonly _modalService = inject(NgbModal);
  readonly emailSupport: string = EmailRoutePaths.SUPPORT;
  readonly buttonClassName = ButtonClassName.LOGIN_BUTTON;
  readonly faq = `/${AppRoutePaths.FAQ}`;

  isApiLoading = signal<boolean>(false);

  redirectToHome(): void {
    this._webRedirect.redirectToHome();
  }

  trackAuthEvent(eventName: string, result = ''): void {
    const authTrackData: AuthTracking = {
      pageUrl: this._router.url,
      eventName: eventName,
      env: ENV.name,
      result: result,
      fromMobile: this._webviewService.isWebview,
    };
    this._gtmService.sendDataToGTM(authTrackData);
  }

  openAuthResponseModal(result: number): NgbModalRef {
    const modal = this._modalService.open(AuthResponseModalComponent, { ...MODAL_CONFIG });
    modal.componentInstance.result = result;
    return modal;
  }

  handleApiError(): void {
    this.isApiLoading.set(false);
    this._modalService.open(ApiErrorModalComponent, { ...MODAL_CONFIG });
  }

}
