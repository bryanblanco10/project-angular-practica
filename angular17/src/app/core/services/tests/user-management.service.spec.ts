import { TestBed } from '@angular/core/testing';

import { UserManagementService } from '../user-management.service';

import { TokenAuth } from '@modules/auth/models/interfaces/auth.interface';
import { TypePropertyLocalStorage } from '@app/core/models/enums';
import { User } from '@app/core/models/interfaces/user.interface';
import { LocalstorageService } from '@app/shared/utils/localstorage.service';

describe('UserManagementService', () => {
  let service: UserManagementService;
  let mockLocalStorageService: jasmine.SpyObj<LocalstorageService>;

  beforeEach(() => {
    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['setItem', 'getItem']);

    TestBed.configureTestingModule({
      providers: [
        UserManagementService,
        { provide: LocalstorageService, useValue: mockLocalStorageService }
      ]
    });
    service = TestBed.inject(UserManagementService);
  });

  it('should be created UserManagementService', () => {
    expect(service).toBeTruthy();
  });

  it('should save token to local storage', () => {
    const token: TokenAuth = { jwtToken: 'test', refreshToken: 'refresh' };
    service.saveTokenStorage(token);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledWith(TypePropertyLocalStorage.ENLACE_TOKEN, token);
  });

  it('should save user to local storage', () => {
    const user: User = { id: 'xxxx-xxxx-xxxx-xxxx' } as User;
    service.saveUserStorage(user);
    expect(mockLocalStorageService.setItem).toHaveBeenCalledWith(TypePropertyLocalStorage.USER, user);
  });

  it('should return true if user has jwtToken', () => {
    mockLocalStorageService.getItem.and.returnValue({ jwtToken: 'test-token', refreshToken: 'refresh-token' });
    expect(service.isUserLoggedIn).toBeTrue();
  });

  it('should return false if user does not have jwtToken', () => {
    mockLocalStorageService.getItem.and.returnValue(null);
    expect(service.isUserLoggedIn).toBeFalse();
  });

});
