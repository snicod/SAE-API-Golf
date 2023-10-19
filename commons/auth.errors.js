const Config = require('./config');

const ERR_AUTH_LOGIN_NOT_DEFINED = 600;
const ERR_AUTH_PASSWORD_NOT_DEFINED = 601;

const ERR_AUTH_NO_TOKEN = 620;
const ERR_AUTH_NOT_AUTHORIZED = 621;
const ERR_AUTH_PASSWORD_NO_MATCH = 622;
const ERR_AUTH_INVALID_RIGHT = 623;


const authErrors = [
  { number: ERR_AUTH_LOGIN_NOT_DEFINED, status: 400, message: { en: 'user\'s login is not defined or invalid', fr: 'le login de l\'utilisateur n\'est pas défini ou invalide' }},
  { number: ERR_AUTH_PASSWORD_NOT_DEFINED, status: 400, message: { en: 'user\'s password is not defined or invalid', fr: 'le mot de passe de l\'utilisateur n\'est pas défini ou invalide' }},
  { number: ERR_AUTH_NO_TOKEN, status: 400, message: { en: 'no provided session id', fr: 'aucun identifiant de session n\'est fourni' }},
  { number: ERR_AUTH_NOT_AUTHORIZED, status: 401, message: { en: 'invalid jwt token: unauthorized', fr: 'token jwt invalide: autorisation refusée' }},
  { number: ERR_AUTH_PASSWORD_NO_MATCH, status: 401, message: { en: 'given password is invalid', fr: 'le mot de passe fourni est invalide' }},
  { number: ERR_AUTH_INVALID_RIGHT, status: 401, message: { en: 'user has not sufficient rights', fr: 'l\'utilisateur n\'a pas les droits suffisants' }},
];

const getError = (number, lang) => {
  if (lang === undefined) lang = Config.defaultLang;
  let err = authErrors.find(e => e.number === number);
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
  ERR_AUTH_LOGIN_NOT_DEFINED,
  ERR_AUTH_PASSWORD_NOT_DEFINED,
  ERR_AUTH_NO_TOKEN,
  ERR_AUTH_NOT_AUTHORIZED,
  ERR_AUTH_PASSWORD_NO_MATCH,
  ERR_AUTH_INVALID_RIGHT,
  getError
};


