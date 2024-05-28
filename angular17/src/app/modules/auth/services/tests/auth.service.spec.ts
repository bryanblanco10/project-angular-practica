import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment as ENV } from '@environments/environment';

import { AuthService } from '../auth.service';
import {
  AuthResponseEnum,
  AuthenticationPayload,
  EmailPayload,
  EmailTokenPayload,
  ResetPasswordPayload,
  UserLoggedIn,
  ValitedEmailToken,
} from '../../models/interfaces/auth.interface';
import {
  AuthResultCode,
  AuthResultMessage,
} from '../../models/enums/auth.enum';
import { User } from '@app/core/models/interfaces/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const api = `${ENV.webApi}/v2/user`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created AuthService', () => {
    expect(service).toBeTruthy();
  });

  describe('#Authenticate method', () => {
    const dummyPayload: AuthenticationPayload = {
      email: 'test@email.com',
      password: 'test-password',
    };

    const dummyResponse: UserLoggedIn = {
      jwtToken: 'jwtToken123',
      refreshToken: 'refreshToken123',
      result: {
        result: AuthResultMessage.OK,
        resultEnum: AuthResultCode.OK,
      },
      userInfo: {} as User,
    };

    it('should send a post request and return a UserLoggeIn', (done) => {
      service.authenticate(dummyPayload).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/authenticate`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });

    it('should return an error message for invalid credentials', (done) => {
      const errorResponse = {
        ...dummyResponse,
        result: {
          result: AuthResultMessage.PASSWORD_INCORRECT,
          resultEnum: AuthResultCode.PASSWORD_INCORRECT,
        },
      };

      service.authenticate(dummyPayload).subscribe((response) => {
        expect(response).toEqual(errorResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/authenticate`);
      expect(req.request.method).toBe('POST');
      req.flush(errorResponse);
    });

    it('should return a migration message for the non-migrated user.', (done) => {
      const migrationResponse = {
        ...dummyResponse,
        result: {
          result: AuthResultMessage.USER_NEEDS_MIGRATE,
          resultEnum: AuthResultCode.USER_NEEDS_MIGRATE,
        },
      };

      service.authenticate(dummyPayload).subscribe((response) => {
        expect(response).toEqual(migrationResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/authenticate`);
      expect(req.request.method).toBe('POST');
      req.flush(migrationResponse);
    });

    it('should return a error message for the non-existed user.', (done) => {
      const notFoundResponse = {
        ...dummyResponse,
        result: {
          result: AuthResultMessage.USER_NOT_FOUND,
          resultEnum: AuthResultCode.USER_NOT_FOUND,
        },
      };

      service.authenticate(dummyPayload).subscribe((response) => {
        expect(response).toEqual(notFoundResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/authenticate`);
      expect(req.request.method).toBe('POST');
      req.flush(notFoundResponse);
    });
  });

  describe('#startForgotPassword method', () => {
    it('should send a post request and return a AuthResponseEnum', (done) => {
      const dummyPayload: EmailPayload = {
        email: 'test@email.com',
        isFromMobile: false,
      };

      const dummyResponse: AuthResponseEnum = {
        result: {
          result: AuthResultMessage.OK,
          resultEnum: AuthResultCode.OK,
        },
      };

      service.startForgotPassword(dummyPayload).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/startForgotPassword`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });

  describe('#startMigration method', () => {
    it('should send a post request and return a AuthResponseEnum', (done) => {
      const dummyPayload: EmailPayload = {
        email: 'test@email.com',
        isFromMobile: false,
      };

      const dummyResponse: AuthResponseEnum = {
        result: {
          result: AuthResultMessage.OK,
          resultEnum: AuthResultCode.OK,
        },
      };

      service.startMigration(dummyPayload).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/startUserMigration`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });

  describe('#emailTokenValidation method', () => {
    const dummyPayload: EmailTokenPayload = {
      userId: 'xxxx-xxxx-xxxx-xxxx',
      token: 'xxxxxxxxxxxxxxxxxxxx',
    };

    const dummyResponse: ValitedEmailToken = {
      email: 'test@gmail.com',
      userName: 'user',
      result: {
        result: AuthResultMessage.OK,
        resultEnum: AuthResultCode.OK,
      },
    };

    it('should send a post request and return a ValitedEmailToken', (done) => {
      service.emailTokenValidation(dummyPayload).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/userTokenValidation`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });

    it('should return an invalid message when the token expires', (done) => {
      const errorResponse = {
        ...dummyResponse,
        result: {
          result: AuthResultMessage.TOKEN_EXPIRED,
          resultEnum: AuthResultCode.TOKEN_EXPIRED,
        },
      };

      service.emailTokenValidation(dummyPayload).subscribe((response) => {
        expect(response).toEqual(errorResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/userTokenValidation`);
      expect(req.request.method).toBe('POST');
      req.flush(errorResponse);
    });
  });

  describe('#resetPasswordAndAuthenticate method', () => {
    it('should send a post request and return a UserLoggedIn', (done) => {
      const dummyPayload: ResetPasswordPayload = {
        userid: 'xxxx-xxxx-xxxx-xxxx',
        password: '********',
        passwordconfirmation: '*******',
        MailingUserToken: 'xxxxxxxxxxxx',
      };

      const dummyResponse: UserLoggedIn = {
        jwtToken: 'jwtToken123',
        refreshToken: 'refreshToken123',
        result: {
          result: AuthResultMessage.OK,
          resultEnum: AuthResultCode.OK,
        },
        userInfo: {} as User,
      };

      service
        .resetPasswordAndAuthenticate(dummyPayload)
        .subscribe((response) => {
          expect(response).toEqual(dummyResponse);
          done();
        });

      const req = httpMock.expectOne(`${api}/resetPasswordAndAuthenticate`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });

  describe('#migrateAndAuthenticate method', () => {
    it('should send a post request and return a UserLoggedIn', (done) => {
      const dummyPayload: ResetPasswordPayload = {
        userid: 'xxxx-xxxx-xxxx-xxxx',
        password: '********',
        passwordconfirmation: '*******',
        MailingUserToken: 'xxxxxxxxxxxx',
      };

      const dummyResponse: UserLoggedIn = {
        jwtToken: 'jwtToken123',
        refreshToken: 'refreshToken123',
        result: {
          result: AuthResultMessage.OK,
          resultEnum: AuthResultCode.OK,
        },
        userInfo: {} as User,
      };

      service.migrateAndAuthenticate(dummyPayload).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/migrateAndAuthenticate`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });

  describe('#registerAndAuthenticate method', () => {
    const dummyFormData = new FormData();
    dummyFormData.append('email', 'test@example.com');
    dummyFormData.append('password', 'test12345');

    const dummyResponse: UserLoggedIn = {
      jwtToken: 'jwtToken123',
      refreshToken: 'refreshToken123',
      result: {
        result: AuthResultMessage.OK,
        resultEnum: AuthResultCode.OK,
      },
      userInfo: {} as User,
    };

    it('should send a post request and return a UserLoggedIn', (done) => {
      service.registerAndAuthenticate(dummyFormData).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/registerAndAuthenticate`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });

    it('should return a error message when the user already exists', (done) => {
      const errorResponse = {
        ...dummyResponse,
        result: {
          result: AuthResultMessage.USER_ALREADY_EXISTS,
          resultEnum: AuthResultCode.USER_ALREADY_EXISTS,
        },
      };

      service.registerAndAuthenticate(dummyFormData).subscribe((response) => {
        expect(response).toEqual(errorResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/registerAndAuthenticate`);
      expect(req.request.method).toBe('POST');
      req.flush(errorResponse);
    });
  });

  describe('#refreshToken method', () => {
    it('should send a post request and return a UserLoggedIn', (done) => {
      const dummyPayload = 'token';

      const dummyResponse: UserLoggedIn = {
        jwtToken: 'jwtToken123',
        refreshToken: 'refreshToken123',
        result: {
          result: AuthResultMessage.OK,
          resultEnum: AuthResultCode.OK,
        },
        userInfo: {} as User,
      };

      service.refreshToken(dummyPayload).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/refresh-token`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });
});
