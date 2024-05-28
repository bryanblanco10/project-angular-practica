import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '@environments/environment';
import { Observable } from 'rxjs';
import { AuthResponseEnum, AuthenticationPayload, EmailPayload,
  EmailTokenPayload, ResetPasswordPayload,
  UserLoggedIn, ValitedEmailToken } from '@auth/models/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _api = `${ENV.webApi}/v2/user`;

  constructor(private http: HttpClient) { }

  authenticate(payload: AuthenticationPayload): Observable<UserLoggedIn> {
    const URL = `${this._api}/authenticate`;
    return this.http.post<UserLoggedIn>(URL, payload);
  }

  startForgotPassword(
    payload: EmailPayload
  ): Observable<AuthResponseEnum> {
    const URL = `${this._api}/startForgotPassword`;
    return this.http.post<AuthResponseEnum>(URL, payload);
  }

  startMigration(
    payload: EmailPayload
  ): Observable<AuthResponseEnum> {
    const URL = `${this._api}/startUserMigration`;
    return this.http.post<AuthResponseEnum>(URL, payload);
  }

  emailTokenValidation(payload: EmailTokenPayload): Observable<ValitedEmailToken> {
    const URL = `${this._api}/userTokenValidation`;
    return this.http.post<ValitedEmailToken>(URL, payload);
  }

  resetPasswordAndAuthenticate(
    payload: ResetPasswordPayload
  ): Observable<UserLoggedIn> {
    const URL = `${this._api}/resetPasswordAndAuthenticate`;
    return this.http.post<UserLoggedIn>(URL, payload);
  }

  migrateAndAuthenticate(
    payload: ResetPasswordPayload
  ): Observable<UserLoggedIn> {
    const URL = `${this._api}/migrateAndAuthenticate`;
    return this.http.post<UserLoggedIn>(URL, payload);
  }

  registerAndAuthenticate(payload: FormData): Observable<UserLoggedIn> {
    const URL = `${this._api}/registerAndAuthenticate`;
    return this.http.post<UserLoggedIn>(URL, payload);
  }

  refreshToken(refreshToken: string): Observable<UserLoggedIn> {
    const URL = `${this._api}/refresh-token`;
    return this.http
      .post<UserLoggedIn>(URL, { refreshToken });
  }

}
