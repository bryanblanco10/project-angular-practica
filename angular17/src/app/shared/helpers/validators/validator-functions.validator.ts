import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import isExists from "date-fns/isExists";

export const matchPassword: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    password && repeatPassword && password.value !== repeatPassword.value && repeatPassword.setErrors({ mustMatch: true });
    return null;
};

export const validDate: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {
    const day = control.get('day');
    const month = control.get('month');
    const year = control.get('year');
    if (day?.value && month?.value && year?.value) {
      const { value: valueDay } = day.value;
      const { value: valueMonth } = month.value;
      const { value: valueYear } = year.value;
      const isValidDate = isExists(valueYear, valueMonth, valueDay);
      if (!isValidDate) {
        day.setErrors({ invalidDate: true });
      } else {
        day.setErrors(null);
      }
    }
    return null;
};