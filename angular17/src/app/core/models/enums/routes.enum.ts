export const enum AppRoutePaths {
  MOBILE = 'mobile',
  AUTH = 'enlace/auth',
  HOME = '',
  SUBSCRIPTION = 'subscription',
  TERMS_OF_USE = 'terms-of-use',
  PRIVACY_POLICIES = 'privacy-policies',
  FAQ = 'faq',
}

export const enum AuthRoutePaths {
  AUTH = '',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password',
  MIGRATION = 'migration',
  MISSIONARY = 'misionero'
}

export const enum EmailRoutePaths {
  SUPPORT = 'mailto:soporte@enlace.plus',
}

export const enum WebviewRoutesPaths {
  USER_STARTS_MIGRATION = '/mobile/auth/startUserMigration',
  USER_FORGOT_PASSWORD = '/mobile/auth/startForgotPassword',
  USER_LOGGED_IN = '/mobile/auth/login/success',
  LOGIN_CANCEL = '/mobile/auth/login/cancel'
}