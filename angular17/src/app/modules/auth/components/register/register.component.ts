import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject,} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EMAIL_REGEX, ARRAY_GENDER, MONTH_DAYS, MONTH_NAMES, YEARS } from '@models/constants';
import { AuthRoutePaths, ButtonClassName, FeatureFlag } from '@models/enums';
import { matchPassword, validDate,} from '@helpers/validators/validator-functions.validator';
import { FeatureFlagsManagementService } from '@utils/feature-flags-management.service';
import { CountryService } from '@services/country.service';
import { Country } from '@models/interfaces';

import { AUTH_PROVIDER } from '@auth/components/providers-auth.provider';
import { BaseAuth } from '@auth/components/base-auth.component';
const IS_MISSIONARY = 'isMissionary';
const MIN_LENGTH_PASSWORD = 8;

const enum RegisterFieldsForm {
  EMAIL = 'email',
  PASSWORD = 'password',
  IMAGE_AVATAR = 'imageAvatar',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
  GENDER = 'gender',
  COUNTRY = 'country'
}

interface ValidationConfig {
  observable: Observable<boolean>;
  fields: RegisterFieldsForm[];
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: AUTH_PROVIDER.register,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends BaseAuth implements OnInit, OnDestroy {

  private form: FormBuilder = inject(FormBuilder);
  private _featureFlag = inject(FeatureFlagsManagementService);
 
  isMissionary = false;
  registerForm = this.form.group(
    {
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(MIN_LENGTH_PASSWORD)]],
      repeatPassword: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      gender: [null],
      day: [null],
      month: [null],
      year: [null],
      country: [null],
      termConditions: [false, [Validators.requiredTrue]],
      imageAvatar: [null],
    },
    {
      validators: [matchPassword, validDate],
    }
  );
  countries$: Observable<Country[]> = inject(CountryService).getCountriesLite();
  backButtonClassName = ButtonClassName.LOGIN_BACK_BUTTON;
  arrayGender = ARRAY_GENDER;
  monthDays = MONTH_DAYS;
  monthList = MONTH_NAMES;
  yearList = YEARS;
  private _ngUnsubscribe = new Subject(); 
  private _validationConfigs: ValidationConfig[] = [
    {
      observable: this.isAuthRegisterRequireGenderEnable$,
      fields: [RegisterFieldsForm.GENDER]
    },
    {
      observable: this.isAuthRegisterRequireCountryEnable$,
      fields: [RegisterFieldsForm.COUNTRY]
    },
    {
      observable: this.isAuthRegisterRequireBirthdateEnable$,
      fields: [RegisterFieldsForm.DAY, RegisterFieldsForm.MONTH, RegisterFieldsForm.YEAR]
    }
  ];

  ngOnInit(): void {
    const routeData = this._activatedRoute.snapshot.data;
    this.isMissionary = routeData[IS_MISSIONARY];
    this.setValidationNewAccount();
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe.next(null);
    this._ngUnsubscribe.complete();
  }

  get isAuthRegisterRequireBirthdateEnable$(): Observable<boolean> {
    return this._featureFlag.checkFeatureOn$(FeatureFlag.BIRTHDATE_ENABLE);
  }

  get isAuthRegisterRequireGenderEnable$(): Observable<boolean> {
    return this._featureFlag.checkFeatureOn$(FeatureFlag.GENDER_ENABLE);
  }

  get isAuthRegisterRequireCountryEnable$(): Observable<boolean> {
    return this._featureFlag.checkFeatureOn$(FeatureFlag.COUNTRY_ENABLE);
  }

  get disableButton(): boolean {
    return this.registerForm.invalid || this.isApiLoading();
  }

  setImage(image: Blob | null): void {
    this.getFormControl(RegisterFieldsForm.IMAGE_AVATAR)?.setValue(image);
  }

  goBack(): void {
    this._router.navigate([AuthRoutePaths.AUTH], { relativeTo: this._activatedRoute, queryParamsHandling: 'preserve' });
  }

  isInValid(control: string): boolean {
    return (this.getFormControl(control)?.touched && !!this.getFormControl(control)?.errors) ?? false;
  }

  hasError(type: string, control: string): boolean {
    return this.isInValid(control) && this.getFormControl(control)?.errors?.[type] || false;
  }

  private getFormControl(control: string): AbstractControl | null {
    return this.registerForm.get(control);
  }

  private setValidationNewAccount(): void {
    this._validationConfigs.forEach(config => {
      config.observable.pipe(takeUntil(this._ngUnsubscribe)).subscribe(condition => {
        config.fields.forEach(field => this.setRequiredValidationForField(condition, field));
      });
    });
  }

  private setRequiredValidationForField(condition: boolean, field: string): void {
    if (condition) {
      this.getFormControl(field)?.setValidators([Validators.required]);
    }
  }
  
}
