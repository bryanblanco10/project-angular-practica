import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AuthRoutePaths, BodyClassName, WebviewRoutesPaths } from '@models/enums';
import { WebviewManagementService } from '@utils/webview-management.service';
import { LoadingOverlayService } from '@utils/loading-overlay.service';
import { DomManipulateService } from '@utils/dom-manipulate.service';
import { WebRedirectService } from '@utils/web-redirect.service';
import { fadeInOut } from '@animations/fade.animation';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, OnDestroy {

  private _domManipulate = inject(DomManipulateService);
  private _webviewService = inject(WebviewManagementService);
  private _webRedirect = inject(WebRedirectService);
  private _loadingOverlay = inject(LoadingOverlayService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this._domManipulate.addBodyClass(BodyClassName.LOGIN_BODY);
    this.readUrlParameters();
  }

  ngOnDestroy(): void {
    this._domManipulate.removeBodyClass(BodyClassName.LOGIN_BODY);
  }

  cancelLogin(): void {
    this._webviewService.isWebview
      ? this._webviewService.redirectToMobile(WebviewRoutesPaths.LOGIN_CANCEL)
      : this._webRedirect.redirectToHome();
  }

  private readUrlParameters(): void {
    this._loadingOverlay.showLoadingOverlay();
    const { action  } = this._activatedRoute.snapshot.queryParams;
    if (action) {
      this._router.navigate([AuthRoutePaths.RESET_PASSWORD], { relativeTo: this._activatedRoute, queryParamsHandling: 'preserve' });
    }
    this._loadingOverlay.hideLoadingOverlay();
  }

}
