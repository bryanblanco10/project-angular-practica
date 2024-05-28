import { Routes } from '@angular/router';
import { AuthRoutePaths } from '@models/enums';
import { AuthComponent } from '@auth/container/auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: AuthRoutePaths.AUTH,
        loadComponent: () =>
          import('@auth/components/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: AuthRoutePaths.REGISTER,
        loadComponent: () =>
          import('@auth/components/register/register.component').then((m) => m.RegisterComponent),
        data: { isMissionary: false }
      },
      {
        path: AuthRoutePaths.MISSIONARY,
        loadComponent: () =>
          import('@auth/components/register/register.component').then((m) => m.RegisterComponent),
        data: { isMissionary: true }
      },
      {
        path: AuthRoutePaths.FORGOT_PASSWORD,
        loadComponent: () =>
          import('@auth/components/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
      },
      {
        path: AuthRoutePaths.RESET_PASSWORD,
        loadComponent: () =>
          import('@auth/components/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
      },
      {
        path: AuthRoutePaths.MIGRATION,
        loadComponent: () =>
          import('@auth/components/migration/migration.component').then((m) => m.MigrationComponent),
      },
    ]
  },
]
