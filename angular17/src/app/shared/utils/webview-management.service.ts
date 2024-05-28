import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PATH_MOBILE } from '@models/constants';
import { WebviewRoutesPaths } from '@models/enums';
import { redirectToMobile } from '@helpers/mobile-utils.helper';

type RedirectPath = {
  [key: string]: string;
};

interface RedirectUserLoggedIn {
  path: string;
  jwtToken: string;
  refreshToken: string;
  expirationToken: string;
}

const redirects: RedirectPath = {
  [WebviewRoutesPaths.LOGIN_CANCEL]: `${PATH_MOBILE}${WebviewRoutesPaths.LOGIN_CANCEL}`,
  [WebviewRoutesPaths.USER_LOGGED_IN]: `${PATH_MOBILE}${WebviewRoutesPaths.USER_LOGGED_IN}`,
  [WebviewRoutesPaths.USER_STARTS_MIGRATION]: `${PATH_MOBILE}${WebviewRoutesPaths.USER_STARTS_MIGRATION}`,
  [WebviewRoutesPaths.USER_FORGOT_PASSWORD]: `${PATH_MOBILE}${WebviewRoutesPaths.USER_FORGOT_PASSWORD}`
};

@Injectable({
  providedIn: 'root',
})
export class WebviewManagementService {

  private _isWebview = false;

  constructor(private route: ActivatedRoute) {
    this.readUrl();
  }

  get isWebview(): boolean {
    return this._isWebview;
  }

  redirectToMobile(path: string): void {
    const redirect = redirects[path];
    if (redirect) {
      redirectToMobile(redirect);
    } else {
      throw new Error(`Ruta no encontrada en redirects: ${path}`);
    }
  }

  redirectUserLoggedIn({ path, jwtToken, refreshToken, expirationToken }: RedirectUserLoggedIn): void {
    const redirect = redirects[path];
    const userLoggeInPath = `${redirect}?token=${jwtToken}&refreshToken=${refreshToken}&expirationToken=${expirationToken}`;
    redirectToMobile(userLoggeInPath);
  }

  private readUrl(): void {
    const { fromMobile } = this.route.snapshot.queryParams;
    this._isWebview = fromMobile?.toLowerCase() === 'true' ?? false;
  }
}
