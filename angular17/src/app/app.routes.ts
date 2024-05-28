import { Routes } from '@angular/router';
import { AppRoutePaths } from '@models/enums';

export const routes: Routes = [
  {
    path: AppRoutePaths.AUTH,
    loadChildren: () =>
      import('@modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: AppRoutePaths.FAQ,
    loadComponent: () =>
      import('@layouts/faq/faq.component').then((m) => m.FaqComponent),
  },
  {
    path: AppRoutePaths.TERMS_OF_USE,
    loadComponent: () =>
      import('@layouts/terms-of-use/terms-of-use.component').then(
        (m) => m.TermsOfUseComponent
      ),
  },
  {
    path: AppRoutePaths.PRIVACY_POLICIES,
    loadComponent: () =>
      import('@layouts/privacy-policies/privacy-policies.component').then(
        (m) => m.PrivacyPoliciesComponent
      ),
  },
  {
    path: '**',
    redirectTo: AppRoutePaths.AUTH,
  },
];
