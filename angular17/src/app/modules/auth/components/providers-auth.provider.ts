import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApplyClassDirective } from '@directives/apply-class.directive';
import { ErrorCodeToMessagePipe } from '@auth/pipes/error-code-to-message.pipe';
import { LoadingBounceComponent } from '@components/loadings/loading-bounce/loading-bounce.component';
import { PasswordPlusComponent } from '@components/forms/password-plus/password-plus.component';
import { AvatarPlusComponent } from '@components/forms/avatar-plus/avatar-plus.component';
import { DropdownPlusComponent } from '@components/forms/dropdown-plus/dropdown-plus.component';
import { MapperDropdownPlusPipe } from '@pipes/mapper-dropdown-plus.pipe';
import { CheckboxPlusComponent } from '@app/shared/components/forms/checkbox-plus/checkbox-plus.component';

const COMMON_PROVIDERS = [
  RouterModule,
];

const FORM_PROVIDERS = [
  ...COMMON_PROVIDERS,
  ReactiveFormsModule,
  ApplyClassDirective,
  LoadingBounceComponent,
];

export const AUTH_PROVIDER = {
  login: [
    ...FORM_PROVIDERS,
    PasswordPlusComponent,
    ErrorCodeToMessagePipe,
  ],
  migration: [
    ...COMMON_PROVIDERS,
    ApplyClassDirective,
    LoadingBounceComponent,
  ],
  forgot: FORM_PROVIDERS,
  reset: [
    ...FORM_PROVIDERS,
    PasswordPlusComponent
  ],
  register: [
    ...FORM_PROVIDERS,
    AsyncPipe,
    PasswordPlusComponent,
    AvatarPlusComponent,
    DropdownPlusComponent,
    CheckboxPlusComponent,
    MapperDropdownPlusPipe
  ]
};
