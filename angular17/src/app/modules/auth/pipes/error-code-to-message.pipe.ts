import { Pipe, PipeTransform } from '@angular/core';
import { AuthResultCode } from '@auth/models/enums/auth.enum';

type ErrorMessage = {
  [key: number]: string;
};

const ERROR_MESSAGES: ErrorMessage = {
  [AuthResultCode.USER_NOT_FOUND]: 'Tu correo electrónico o contraseña es incorrecto, inténtalo nuevamente.',
  [AuthResultCode.PASSWORD_INCORRECT]: 'Tu correo electrónico o contraseña es incorrecto, inténtalo nuevamente.',
}

@Pipe({
  name: 'errorCodeToMessage',
  standalone: true
})
export class ErrorCodeToMessagePipe implements PipeTransform {

  transform(code: number): string {
    return ERROR_MESSAGES[code] || `Error ${code} no implementado`;
  }

}
