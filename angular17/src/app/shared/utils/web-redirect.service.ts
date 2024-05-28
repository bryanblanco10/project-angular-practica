import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserLoggedIn } from '@auth/models/interfaces/auth.interface';
import { AppRoutePaths, TypePropertyLocalStorage, WebviewRoutesPaths } from '@models/enums';
import { isStringAndNotEmpty } from '@helpers/text-utils.helper';
import { resolveUrl } from '@helpers/utils.helper';
import { LocalstorageService } from './localstorage.service';
import { WebviewManagementService } from './webview-management.service';
import { UserManagementService } from '@app/core/services/user-management.service';

@Injectable({
  providedIn: 'root',
})
export class WebRedirectService {

  private _previewURL: string | null = '';

  constructor(
    private router: Router, 
    private localStorage: LocalstorageService,
    private webviewService: WebviewManagementService,
    private userManagement: UserManagementService
    ) {
    this._previewURL = this.localStorage.getItem(TypePropertyLocalStorage.PREVIEW_URL);
  }

  redirectToHome(): void {
    // TODO: clear catalog home
    if (isStringAndNotEmpty(this._previewURL)) {
      const path = resolveUrl(this._previewURL as string);
      const navigationExtras: NavigationExtras = path.querys
        ? { queryParams: { ...path.querys } }
        : {};
      this.router.navigate([path.route], navigationExtras);
    } else {
      this.router.navigate(['/', AppRoutePaths.HOME]);
    }
  }

  redirectUserLoggedIn({ userInfo, jwtToken, refreshToken, expirationToken }: UserLoggedIn): void {
    if (this.webviewService.isWebview) {
      this.webviewService.redirectUserLoggedIn({
        path: WebviewRoutesPaths.USER_LOGGED_IN,
        jwtToken,
        refreshToken,
        expirationToken,
      });
    } else {
      this.userManagement.saveUserStorage(userInfo);
      this.userManagement.saveTokenStorage({ jwtToken, refreshToken });
      this.redirectToHome();
    }
  }


}
