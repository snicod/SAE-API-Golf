module.exports = {
  defaultLang: 'fr',
  secretKey: 'do-not-reveal-weatherapi-secret-key',
  jwtExpiration: 300, // change to 300 (=5 minutes) for prod
  jwtRefreshExpiration: 7200, // change to 7200 (=2h) for prod
  loginRefreshExpiration: 5, // 5 sec. should be sufficient
  rights: ['admin', 'basic'],
  //---------------------
  // constants for models
  //---------------------
  // for rights
  RIGHT_NAME_MIN_SIZE: 3,
  RIGHT_NAME_MAX_SIZE: 50,
  // for users
  USER_NAME_MIN_SIZE: 3,
  USER_NAME_MAX_SIZE: 50,
  USER_PASSWORD_MIN_SIZE: 8,
  USER_PASSWORD_MAX_SIZE: 100,
  USER_EMAIL_MIN_SIZE: 3,
  USER_EMAIL_MAX_SIZE: 60,
};

