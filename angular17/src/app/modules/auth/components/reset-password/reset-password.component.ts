import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthRoutePaths, ButtonClassName } from '@models/enums';
import { matchPassword } from '@helpers/validators/validator-functions.validator';

import { ResetPasswordPayload, UserLoggedIn, ValitedEmailToken } from '@auth/models/interfaces/auth.interface';
import { AuthCustomCode, AuthResultCode, AuthTrackEvent } from '@auth/models/enums/auth.enum';
import { AUTH_PROVIDER } from '@auth/components/providers-auth.provider';
import { BaseAuth } from '@auth/components/base-auth.component';
const FORGOT_PASSWORD = 'ForgotPassword';
const PASSWORD = 'password';
const REPEAT_PASSWORD = 'repeatPassword';
interface QueryParamsType {
  action: string;
  token: string;
  user_id: string;
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: AUTH_PROVIDER.reset,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent extends BaseAuth implements OnInit {
  private form: FormBuilder = inject(FormBuilder);
  private _userId = '';
  private _mailingUserToken = '';

  isFromForgotPassword =  signal<boolean>(true);
  isValidatingToken = signal<boolean>(true);
  email = signal<string>('');
  resetPasswordForm = this.form.group(
    {
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]],
    },
    {
      validators: matchPassword,
    }
  );
  backButtonClassName = ButtonClassName.LOGIN_BACK_BUTTON;

  get passwordControl(): AbstractControl | null {
    return this.resetPasswordForm.get(PASSWORD);
  }

  get repeatPasswordControl(): AbstractControl | null {
    return this.resetPasswordForm.get(REPEAT_PASSWORD);
  }

  get disableButton(): boolean {
    return this.resetPasswordForm.invalid || this.isApiLoading();
  }

  ngOnInit(): void {
    this.readUrlParameters();
  }

  readUrlParameters(): void {
    const params = this._activatedRoute.snapshot.queryParams as QueryParamsType;
    const { action, token, user_id } = params;
    this._mailingUserToken = token;
    this._userId = user_id;
    this.isFromForgotPassword.update(() => action === FORGOT_PASSWORD);
    this.validateToken(this._userId, this._mailingUserToken);
  }

  validateToken(userId: string, token: string): void {
    this._authService.emailTokenValidation({ userId, token }).subscribe({
      next: (response) => this.handleValitedEmailTokenResponse(response),
      error: () => this.handleValitedEmailTokenError(),
    });
  }

  handleValitedEmailTokenResponse(response: ValitedEmailToken): void {
    const { resultEnum, result } = response.result;
    if (resultEnum === AuthResultCode.TOKEN_EXPIRED) {
      this.tokenExpired(result);
    }
    if (resultEnum === AuthResultCode.OK) {
      this.tokenSuccess(response);
    }
  }

  tokenExpired(result: string): void {
    this.trackAuthEvent(AuthTrackEvent.TOKEN_EXPIRED, result);
    this.openAuthResponseModal(AuthResultCode.TOKEN_EXPIRED);
    this.redirectToLogin();
  }

  tokenSuccess({ result, email }: ValitedEmailToken): void {
    const { result: resultMessage } = result;
    this.email.set(email);
    this.isValidatingToken.set(false);
    this.trackAuthEvent(AuthTrackEvent.TOKEN_VALIDATE, resultMessage);
  }

  handleValitedEmailTokenError(): void {
    this.isValidatingToken.set(false);
    this.redirectToLogin();
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const payload = this.buildPayloadResetPassword();
      this.isApiLoading.set(true);
      this.isFromForgotPassword() 
        ? this.resetPasswordAndAuthenticate(payload)
        : this.migrateAndAuthenticate(payload);
    }
  }

  resetPasswordAndAuthenticate(payload: ResetPasswordPayload): void {
    this._authService.resetPasswordAndAuthenticate(payload).subscribe({
      next: (response) => this.handleResetPassword(response),
      error: () => this.handleApiError()
    })
  }

  handleResetPassword(response: UserLoggedIn): void {
    this.isApiLoading.set(false);
    const { resultEnum, result } = response.result;
    resultEnum === AuthResultCode.OK
      ? this.handleAuthSuccess(AuthTrackEvent.FORGOT_PASSWORD_SUCCESS, result, response)
      : this.trackAuthEvent(AuthTrackEvent.RESET_PASSWORD_ERROR, result);

  }

  migrateAndAuthenticate(payload: ResetPasswordPayload): void {
    this._authService.migrateAndAuthenticate(payload).subscribe({
      next: (response) => this.handleMigratedAccount(response),
      error: () => this.handleApiError()
    })
  }

  handleMigratedAccount(response: UserLoggedIn): void {
    this.isApiLoading.set(false);
    const { resultEnum, result } = response.result;
    resultEnum === AuthResultCode.OK
      ? this.handleAuthSuccess(AuthTrackEvent.MIGRATION_SUCCESS, result, response)
      : this.trackAuthEvent(AuthTrackEvent.MIGRATION_ERROR, result);
  }

  handleAuthSuccess(event: string, result: string, response: UserLoggedIn): void {
    this.trackAuthEvent(event, result);
    if (!this._webviewService.isWebview) {
      this.isFromForgotPassword() 
        ? this.openAuthResponseModal(AuthCustomCode.RESET_PASSWORD_SUCCESS)
        : this.openAuthResponseModal(AuthCustomCode.USER_HAS_BEEN_MIGRATED);
    }
    this._webRedirect.redirectUserLoggedIn(response);
  }

  redirectToLogin(): void {
    const queryParams = {
      fromMobile: this._webviewService.isWebview.toString()
    };

    this._router.navigate([AuthRoutePaths.AUTH], {
      relativeTo: this._activatedRoute,
      queryParams: this._webviewService.isWebview ? queryParams : {},
    });
  }

  buildPayloadResetPassword(): ResetPasswordPayload {
    return {
      MailingUserToken: this._mailingUserToken,
      userid: this._userId,
      password: this.passwordControl?.value,
      passwordconfirmation: this.repeatPasswordControl?.value
    }
  }

  isInValid(control: AbstractControl | null): boolean {
    return (control?.touched && !!control?.errors) ?? false;
  }

  hasError(type: string, control: AbstractControl | null): boolean {
    return this.isInValid(control) && control?.errors?.[type] || false;
  }

}
