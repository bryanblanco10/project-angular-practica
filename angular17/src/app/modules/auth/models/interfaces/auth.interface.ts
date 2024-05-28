import { User } from '@interfaces/user.interface';
import { AuthResultCode, AuthResultMessage } from '@auth/models/enums/auth.enum';

export type UserLoggedIn = Readonly<{
  jwtToken: string;
  refreshToken: string;
  expirationToken: string;
  result: ResultRequest;
  userInfo: User;
}>;

export type ValitedEmailToken = Readonly<{
  email: string;
  userName: string;
  result: ResultRequest;
}>;

export type AuthResponseEnum = Readonly<{
  result: ResultRequest;
}>;

export interface TokenAuth {
  jwtToken: string;
  refreshToken: string;
}

export interface AuthenticationPayload {
  email: string;
  password: string;
}

export interface EmailPayload {
  email: string;
  isFromMobile: boolean;
}

export interface EmailTokenPayload {
  userId: string;
  token: string;
}

export interface ResetPasswordPayload {
  userid: string;
  password: string;
  passwordconfirmation: string;
  MailingUserToken: string;
}

interface ResultRequest {
  result: AuthResultMessage;
  resultEnum: AuthResultCode;
}

export interface AuthTracking {
  env: string;
  eventName: string;
  pageUrl: string;
  result: string;
  fromMobile: boolean;
}
