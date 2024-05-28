import { Injectable, inject } from '@angular/core';
import { TypePropertyLocalStorage } from '@models/enums';
import { User } from '@interfaces/user.interface';

import { TokenAuth } from '@modules/auth/models/interfaces/auth.interface';
import { LocalstorageService } from '@utils/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private _storage = inject(LocalstorageService);
  private _email = '';

  get isUserLoggedIn(): boolean {
    const enlaceToken = this._storage.getItem<TokenAuth>(TypePropertyLocalStorage.ENLACE_TOKEN);
    return !!enlaceToken?.jwtToken;
  }

  get email(): string {
    return this._email;
  }

  setEmail(email: string): void {
    this._email = email;
  }

  saveTokenStorage(token: TokenAuth): void {
    this._storage.setItem(TypePropertyLocalStorage.ENLACE_TOKEN, token);
  }

  saveUserStorage(user: User): void {
    this._storage.setItem(TypePropertyLocalStorage.USER, user);
  }

}
