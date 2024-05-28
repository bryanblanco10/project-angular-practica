export const enum AuthResultCode {
  OK = 1,
  PASSWORD_INCORRECT = 8,
  USER_NOT_FOUND = 9,
  USER_NEEDS_MIGRATE = 10,
  REFRESH_TOKEN_NOT_FOUND = 11,
  REFRESH_TOKEN_IN_ACTIVE = 12,
  TOKEN_EXPIRED = 13,
  USER_ALREADY_EXISTS = 18,
}

export const enum AuthCustomCode {
  FORGOT_PASSWORD_OK = 100,
  USER_HAS_BEEN_MIGRATED = 101,
  RESET_PASSWORD_SUCCESS = 102,
}

export const enum AuthResultMessage {
  OK = 'OK',
  PASSWORD_INCORRECT = 'PASSWORDINCORRECT',
  USER_NEEDS_MIGRATE = 'USERNEEDSMIGRATE',
  USER_NOT_FOUND = 'USERNOTFOUND',
  TOKEN_EXPIRED = 'TOKENEXPIRED',
  USER_ALREADY_EXISTS = 'USERALREADYEXISTS',
}

export const enum AuthTrackEvent {
  LOGIN_START = 'startLogin',
  CHECK_EMAIL_SUCCESS = 'checkEmailSuccess',
  CHECK_EMAIL_ERROR = 'checkEmailError',
  CHECK_EMAIL_MIGRATION = 'startMigration',
  CHECK_EMAIL_MIGRATION_SUCCESS = 'startMigrationSendEmailSuccess',
  CHECK_EMAIL_MIGRATION_ERROR = 'startMigrationSendEmailError',
  MIGRATION_USER_START = 'changePasswordByUserMigration',
  MIGRATION_SUCCESS = 'userMigrationSuccess',
  MIGRATION_ERROR = 'userMigrationError',
  CHECK_AUTH = 'startCheckAuth',
  CHECK_AUTH_SUCCESS = 'checkAuthSuccess',
  CHECK_AUTH_ERROR = 'checkAuthError',
  REGISTER_START = 'startRegister',
  REGISTER_SUCCESS = 'registerSuccess',
  REGISTER_ERROR = 'registerError',
  FORGOT_PASSWORD_START = 'startForgotPassword',
  FORGOT_PASSWORD_SUCCESS = 'forgotPasswordSendEmailSuccess',
  FORGOT_PASSWORD_ERROR = 'forgotPasswordSendEmailError',
  RESET_PASSWORD_START = 'changePasswordByForgotPassword',
  RESET_PASSWORD_SUCCESS = 'forgotPasswordSuccess',
  RESET_PASSWORD_ERROR = 'forgotPasswordError',
  TOKEN_EXPIRED = 'tokenExpired',
  TOKEN_VALIDATE = 'tokenValidate'
}
