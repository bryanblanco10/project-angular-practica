import { ChangeDetectionStrategy, Component,OnInit,inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMAIL_REGEX } from '@models/constants';
import { AuthRoutePaths, ButtonClassName, WebviewRoutesPaths } from '@models/enums';
import { handledAsyncFunction } from '@helpers/handle-try-catch.helper';

import { BaseAuth } from '@auth/components/base-auth.component';
import { AUTH_PROVIDER } from '@auth/components/providers-auth.provider';
import { AuthResponseEnum, EmailPayload } from '@auth/models/interfaces/auth.interface';
import { AuthCustomCode, AuthResultCode, AuthTrackEvent } from '@auth/models/enums/auth.enum';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: AUTH_PROVIDER.forgot,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent extends BaseAuth implements OnInit {

  private form: FormBuilder = inject(FormBuilder);
  
  forgotPasswordForm = this.form.group({
    email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
  });
  backButtonClassName = ButtonClassName.LOGIN_BACK_BUTTON;

  // TODO: Intentar con un computed
  get disableButton(): boolean {
    return this.forgotPasswordForm.invalid || this.isApiLoading();
  }

  ngOnInit(): void {
    this.trackAuthEvent(AuthTrackEvent.FORGOT_PASSWORD_START);
  }

  sendEmail(): void {
    if (this.forgotPasswordForm.valid) {
      const payload = this.forgotPasswordForm.value as EmailPayload;
      this.isApiLoading.set(true);
      this._authService.startForgotPassword(payload).subscribe({
        next: (response) => this.handleForgotPasswordResponse(response),
        error: () => this.handleApiError(),
      });
    }
  }

  handleForgotPasswordResponse(response: AuthResponseEnum): void {
    this.isApiLoading.set(false);
    const { resultEnum, result } = response.result;
    if (resultEnum === AuthResultCode.OK) {
      this.handleForgotPasswordSuccess(result);
    } else {
      this.handleAuthModal(resultEnum);
      this.trackAuthEvent(AuthTrackEvent.FORGOT_PASSWORD_ERROR, result);
    }
  }

  handleForgotPasswordSuccess(result: string): void {
    const isWebview = this._webviewService.isWebview;
    this.trackAuthEvent(AuthTrackEvent.FORGOT_PASSWORD_SUCCESS, result);
    if (isWebview) {
      this._webviewService.redirectToMobile(WebviewRoutesPaths.USER_FORGOT_PASSWORD);
    } else {
      this.handleAuthModal(AuthCustomCode.FORGOT_PASSWORD_OK);
    }
  }

  goBack(): void {
    this._router.navigate([AuthRoutePaths.AUTH], { relativeTo: this._activatedRoute, queryParamsHandling: 'preserve' });
  }

  async handleAuthModal(result: number): Promise<void> {
    const modal = this.openAuthResponseModal(result);
    const [path] = await handledAsyncFunction<string, boolean | number>(modal.result);

    if (this.shouldRedirectToHome(result)) {
      this.redirectToHome();
    }

    if (path) {
      this.navigateToRelativePath(path);
    }
  }

  private shouldRedirectToHome(result: number): boolean {
    return result === AuthCustomCode.FORGOT_PASSWORD_OK;
  }

  private navigateToRelativePath(path: string): void {
    this._router.navigate([path], { relativeTo: this._activatedRoute.parent, queryParamsHandling: 'preserve' });
  }
}
