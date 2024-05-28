import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthRoutePaths, WebviewRoutesPaths } from '@models/enums';

import { AuthResponseEnum } from '@auth/models/interfaces/auth.interface';
import { AuthResultCode, AuthTrackEvent } from '@auth/models/enums/auth.enum';
import { BaseAuth } from '@auth/components/base-auth.component';
import { AUTH_PROVIDER } from '@auth/components/providers-auth.provider';

@Component({
  selector: 'app-migration',
  standalone: true,
  imports: AUTH_PROVIDER.migration,
  templateUrl: './migration.component.html',
  styleUrls: ['./migration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MigrationComponent extends BaseAuth implements OnInit {

  ngOnInit(): void {
    this.initMigration();
  }

  initMigration(): void {
    const isWebview = this._webviewService.isWebview;
    const email = this._userManagement.email;
    this.trackAuthEvent(AuthTrackEvent.CHECK_EMAIL_MIGRATION);
    email ? this.startMigration(email, isWebview) : this.redirectToAuth();
  }

  redirectToAuth(): void {
    this._router.navigate([AuthRoutePaths.AUTH], { 
      relativeTo: this._activatedRoute, 
      queryParamsHandling: 'preserve' 
    });
  }

  startMigration(email: string, isWebview: boolean): void {
    this._authService.startMigration({email, isFromMobile: isWebview})
      .subscribe({
        next: (response) => this.handleMigrationResponse(response),
        error: () => this.handleApiError(),
      })
  }

  handleMigrationResponse(response: AuthResponseEnum): void {
    this.isApiLoading.set(false);
    const { resultEnum, result } = response.result;
    (resultEnum === AuthResultCode.OK) 
      ? this.handleMigrationSuccess(result)
      : this.trackAuthEvent(AuthTrackEvent.CHECK_EMAIL_MIGRATION_ERROR, result);
  }

  handleMigrationSuccess(result: string): void {
    this.trackAuthEvent(AuthTrackEvent.CHECK_EMAIL_MIGRATION_SUCCESS, result);
    this._userManagement.setEmail('');
  }

  redirect(): void {
    const isWebview = this._webviewService.isWebview;
    (isWebview) 
     ? this._webviewService.redirectToMobile(WebviewRoutesPaths.USER_STARTS_MIGRATION)
     : this.redirectToHome();
  }


}
