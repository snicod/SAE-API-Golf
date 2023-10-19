const Config = require('./config');

const ERR_USER_LOGIN_NOT_DEFINED = 400;
const ERR_USER_PASSWORD_NOT_DEFINED = 401;
const ERR_USER_CAPTCHATOKEN_NOT_DEFINED = 402;
const ERR_USER_EMAIL_NOT_DEFINED = 403;
const ERR_USER_RIGHTS_NOT_DEFINED = 404;
const ERR_USER_DATA_NOT_DEFINED = 405;


const ERR_USER_CREATE_ALREADY_LOGIN = 420;
const ERR_USER_INVALID_PASSWORD = 421;
const ERR_USER_CANNOT_ENCRYPT_PASSWORD = 422;
const ERR_USER_INVALID_CREATE_REQUEST = 423;
const ERR_USER_CANNOT_CREATE = 424;
const ERR_USER_INVALID_REGISTER_REQUEST = 425;
const ERR_USER_CANNOT_REGISTER = 426;
const ERR_USER_INVALID_FIND_LOGIN_REQUEST = 427;
const ERR_USER_CANNOT_FIND_LOGIN = 428;
const ERR_USER_INVALID_FIND_ID_REQUEST = 429;
const ERR_USER_CANNOT_FIND_ID = 430;
const ERR_USER_CAPTCHATOKEN_FAILED = 431;
const ERR_USER_CANNOT_UPDATE = 432;
const ERR_USER_INVALID_FIND_USERS_REQUEST = 433;


const userErrors = [
  { number: ERR_USER_LOGIN_NOT_DEFINED, status: 400, message: { en: 'user\'s login is not defined or invalid', fr: 'le login de l\'utilisateur n\'est pas défini ou invalide' }},
  { number: ERR_USER_PASSWORD_NOT_DEFINED, status: 400, message: { en: 'user\'s password is not defined or invalid', fr: 'le mot de passe de l\'utilisateur n\'est pas défini ou invalide' }},
  { number: ERR_USER_CAPTCHATOKEN_NOT_DEFINED, status: 400, message: { en: 'captcha token is not defined', fr: 'le token captcha n\'est pas défini' }},
  { number: ERR_USER_EMAIL_NOT_DEFINED, status: 400, message: { en: 'user\'s email is not defined or invalid', fr: 'l\'adresse mail de l\'utilisateur n\'est pas définie ou invalide' }},
  { number: ERR_USER_RIGHTS_NOT_DEFINED, status: 400, message: { en: 'user\'s rights are not defined or invalid', fr: 'les droits de l\'utilisateur ne sont pas définis ou invalides' }},
  { number: ERR_USER_DATA_NOT_DEFINED, status: 400, message: { en: 'user\'s data needed to update are not defined or invalid', fr: 'les données pour mettre à jour l\'utilisateur ne sont pas définies ou invalides' }},
  { number: ERR_USER_CREATE_ALREADY_LOGIN, status: 403, message: { en: 'user\'s login already exists', fr: 'le login de l\'utilisateur existe déjà' }},
  { number: ERR_USER_INVALID_PASSWORD, status: 400, message: { en: 'user\'s password is invalid', fr: 'le mot de passe de l\'utilisateur est invalide' }},
  { number: ERR_USER_CANNOT_ENCRYPT_PASSWORD, status: 400, message: { en: 'cannot encrypt user\'s password', fr: 'impossible de crypter le mot de passe de l\'utilisateur' }},
  { number: ERR_USER_INVALID_CREATE_REQUEST, status: 400, message: { en: 'invalid create user request', fr: 'requête de création d\'un utilisateur invalide' }},
  { number: ERR_USER_CANNOT_CREATE, status: 400, message: { en: 'cannot create user', fr: 'impossible de créer un utilisateur' }},
  { number: ERR_USER_INVALID_REGISTER_REQUEST, status: 400, message: { en: 'invalid register user request', fr: 'requête d\'enregistrement d\'un utilisateur invalide' }},
  { number: ERR_USER_CANNOT_REGISTER, status: 400, message: { en: 'cannot register user', fr: 'impossible d\'enregistrer un utilisateur' }},
  { number: ERR_USER_INVALID_FIND_LOGIN_REQUEST, status: 400, message: { en: 'invalid find user by login request', fr: 'requête de recherche d\'un utilisateur par login invalide' }},
  { number: ERR_USER_CANNOT_FIND_LOGIN, status: 404, message: { en: 'cannot find a user with the given login', fr: 'impossible de trouver un utilisateur avec le login indiqué' }},
  { number: ERR_USER_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'invalid find user by id request', fr: 'requête de recherche d\'un utilisateur par id invalide' }},
  { number: ERR_USER_CANNOT_FIND_ID, status: 404, message: { en: 'cannot find a user with the given id', fr: 'impossible de trouver un utilisateur avec l\'id indiqué' }},
  { number: ERR_USER_CAPTCHATOKEN_FAILED, status: 401, message: { en: 'the captcha challenge failed', fr: 'échec du challenge captcha' }},
  { number: ERR_USER_CANNOT_UPDATE, status: 400, message: { en: 'cannot update user', fr: 'impossible de mettre à jour un utilisateur' }},
  { number: ERR_USER_INVALID_FIND_USERS_REQUEST, status: 400, message: { en: 'invalid request to get all users', fr: 'requête pour récupérer les utilisateurs invalide' }},
];

const getError = (number, lang) => {
  if (lang === undefined) lang = Config.defaultLang;
  let err = userErrors.find(e => e.number === number);
  if (err !== undefined) {
    if (lang === 'en') {
      return {
        error: err.number,
        status: err.status,
        data: err.message.en
      };
    }
    else if (lang === 'fr') {
      return {
        error: err.number,
        status: err.status,
        data: err.message.fr
    };
    }
  }
  return {
    error: 1,
    status: 500,
    data: 'undetermined error'
  }
};

module.exports = {
  ERR_USER_LOGIN_NOT_DEFINED,
  ERR_USER_PASSWORD_NOT_DEFINED,
  ERR_USER_CAPTCHATOKEN_NOT_DEFINED,
  ERR_USER_EMAIL_NOT_DEFINED,
  ERR_USER_DATA_NOT_DEFINED,
  ERR_USER_RIGHTS_NOT_DEFINED,
  ERR_USER_CREATE_ALREADY_LOGIN,
  ERR_USER_INVALID_PASSWORD,
  ERR_USER_CANNOT_ENCRYPT_PASSWORD,
  ERR_USER_INVALID_CREATE_REQUEST,
  ERR_USER_CANNOT_CREATE,
  ERR_USER_INVALID_REGISTER_REQUEST,
  ERR_USER_CANNOT_REGISTER,
  ERR_USER_INVALID_FIND_LOGIN_REQUEST,
  ERR_USER_CANNOT_FIND_LOGIN,
  ERR_USER_INVALID_FIND_ID_REQUEST,
  ERR_USER_CANNOT_FIND_ID,
  ERR_USER_CAPTCHATOKEN_FAILED,
  ERR_USER_INVALID_FIND_USERS_REQUEST,
  ERR_USER_CANNOT_UPDATE,
  getError
};


