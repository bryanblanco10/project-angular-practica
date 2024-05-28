import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EMAIL_REGEX } from '@models/constants';
import { AuthRoutePaths } from '@models/enums';
import { handledAsyncFunction } from '@helpers/handle-try-catch.helper';

import { AuthenticationPayload, UserLoggedIn } from '@auth/models/interfaces/auth.interface';
import { AuthResultCode, AuthTrackEvent } from '@auth/models/enums/auth.enum';
import { BaseAuth } from '@auth/components/base-auth.component';
import { AUTH_PROVIDER } from '@auth/components/providers-auth.provider';

const PASSWORD = 'password';
const EMAIL = 'email';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: AUTH_PROVIDER.login,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends BaseAuth implements OnInit {
  private form: FormBuilder = inject(FormBuilder);

  loginForm = this.form.group({
    email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    password: ['', [Validators.required]],
  });
  errorCode: number | null = null;

  get emailControl(): AbstractControl | null {
    return this.loginForm.get(EMAIL);
  }

  get passwordControl(): AbstractControl | null {
    return this.loginForm.get(PASSWORD);
  }

  get disableButton(): boolean {
    return this.loginForm.invalid || this.isApiLoading();
  }

  ngOnInit(): void {
    this.trackAuthEvent(AuthTrackEvent.LOGIN_START);
  }

  authenticate(): void {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value as AuthenticationPayload;
      this.isApiLoading.set(true);
      this._authService.authenticate(payload).subscribe({
        next: (response) => this.handleAuthenticationResponse(response),
        error: () => this.handleApiError(),
      });
    }
  }

  handleAuthenticationResponse(response: UserLoggedIn): void {
    this.isApiLoading.set(false);
    const { resultEnum, result } = response.result;

    if (resultEnum === AuthResultCode.OK) {
      this.handleAuthSuccess(result, response);
    } else if (resultEnum === AuthResultCode.USER_NEEDS_MIGRATE) {
      this.handleUserNeedsMigration();
    } else if (resultEnum === AuthResultCode.USER_NOT_FOUND) {
      this.handleUserNotFound(result, resultEnum);
    } else {
      this.handleDefaultCase(result, resultEnum);
    }
  }

  handleAuthSuccess(result: string, response: UserLoggedIn): void {
    this.trackAuthEvent(AuthTrackEvent.CHECK_AUTH_SUCCESS, result);
    this._webRedirect.redirectUserLoggedIn(response);
  }

  handleUserNeedsMigration(): void {
    this._userManagement.setEmail(this.emailControl?.value);
    this._router.navigate([AuthRoutePaths.MIGRATION], { relativeTo: this._activatedRoute, queryParamsHandling: 'preserve' });
  }

  handleUserNotFound(result: string, resultEnum: number): void {
    this.trackAuthEvent(AuthTrackEvent.CHECK_EMAIL_ERROR, result);
    this.handleAuthModal(resultEnum);
  }

  handleDefaultCase(result: string, resultEnum: number): void {
    this.trackAuthEvent(AuthTrackEvent.CHECK_EMAIL_ERROR, result);
    this.setErrorForm(resultEnum);
  }

  async handleAuthModal(result: number): Promise<void> {
    const modal = this.openAuthResponseModal(result);
    const [path] = await handledAsyncFunction<string, null>(modal.result);
    if (path) {
      this._router.navigate([path], { relativeTo: this._activatedRoute, queryParamsHandling: 'preserve' });
    }
  }

  setErrorForm(errorEnum: number): void {
   this.emailControl?.setErrors({ invalid: true });
   this.passwordControl?.setErrors({ invalid: true });
   this.errorCode = errorEnum;
  }

  handleErrorCode(): void {
    if (this.errorCode) {
      this.emailControl?.setErrors(null);
      this.passwordControl?.setErrors(null);
      this.errorCode = null;
    }
  }

  redirectToForgotPassword(): void {
    this._router.navigate([AuthRoutePaths.FORGOT_PASSWORD], { relativeTo: this._activatedRoute, queryParamsHandling: 'preserve' });
  }

  redirectToRegister(): void {
    this._router.navigate([AuthRoutePaths.REGISTER], { relativeTo: this._activatedRoute, queryParamsHandling: 'preserve' });
  }

}
