const Config = require('./config');

const ERR_MEASURE_TYPE_NOT_DEFINED = 300; //
const ERR_MEASURE_DATE_NOT_DEFINED = 301;
const ERR_MEASURE_VALUE_NOT_DEFINED = 302;
const ERR_MEASURE_MODULE_NOT_DEFINED = 303;
const ERR_MEASURE_DATA_NOT_DEFINED = 304;
const ERR_MEASURE_INVALID_MODULE = 305;

const ERR_MEASURE_INVALID_CREATE_REQUEST = 310;
const ERR_MEASURE_CANNOT_CREATE = 311;

const ERR_MEASURE_CANNOT_FIND_ID = 320;
const ERR_MEASURE_INVALID_FIND_ID_REQUEST = 321;

const ERR_MEASURE_CANNOT_UPDATE = 330;

const ERR_MEASURE_INVALID_FIND_REQUEST = 340;

const measureErrors = [
  { number: ERR_MEASURE_TYPE_NOT_DEFINED, status: 400, message: { en: 'no type filed is provided', fr: 'aucun champ type n\'est fourni' }},
  { number: ERR_MEASURE_DATE_NOT_DEFINED, status: 400, message: { en: 'no date field is provided', fr: 'aucun champ date n\'est fourni' }},
  { number: ERR_MEASURE_VALUE_NOT_DEFINED, status: 400, message: { en: 'no value field is provided', fr: 'aucun champ value n\'est fourni' }},
  { number: ERR_MEASURE_MODULE_NOT_DEFINED, status: 400, message: { en: 'no module field is provided', fr: 'aucun champ module n\'est fourni' }},
  { number: ERR_MEASURE_DATA_NOT_DEFINED, status: 400, message: { en: 'no data field is provided', fr: 'aucun champ data n\'est fourni' }},
  { number: ERR_MEASURE_INVALID_MODULE, status: 400, message: { en: 'module id is invalid', fr: 'id de module invalide' }},
  { number: ERR_MEASURE_INVALID_CREATE_REQUEST, status: 400, message: { en: 'invalid request to create a measure', fr: 'requête de création de mesure invalide' }},
  { number: ERR_MEASURE_CANNOT_CREATE, status: 400, message: { en: 'cannot create a measure', fr: 'requête de création de mesure impossible' }},
  { number: ERR_MEASURE_CANNOT_FIND_ID, status: 400, message: { en: 'cannot find a measure', fr: 'impossible de trouver une mesure' }},
  { number: ERR_MEASURE_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'invalid request to find a measure', fr: 'requête de recherche de mesure invalide' }},
  { number: ERR_MEASURE_CANNOT_UPDATE, status: 400, message: { en: 'cannot update a measure', fr: 'requête de mise à jour de mesure impossible' }},
  { number: ERR_MEASURE_INVALID_FIND_REQUEST, status: 400, message: { en: 'invalid request to find all measures', fr: 'requête de recherche de toutes les mesures invalide' }},
];

const getError = (number, lang) => {
  if (lang === undefined) lang = Config.defaultLang;
  let err = measureErrors.find(e => e.number === number);
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
  ERR_MEASURE_TYPE_NOT_DEFINED,
  ERR_MEASURE_DATE_NOT_DEFINED,
  ERR_MEASURE_VALUE_NOT_DEFINED,
  ERR_MEASURE_MODULE_NOT_DEFINED,
  ERR_MEASURE_DATA_NOT_DEFINED,
  ERR_MEASURE_INVALID_MODULE,
  ERR_MEASURE_INVALID_CREATE_REQUEST,
  ERR_MEASURE_CANNOT_CREATE,
  ERR_MEASURE_CANNOT_FIND_ID,
  ERR_MEASURE_INVALID_FIND_ID_REQUEST,
  ERR_MEASURE_CANNOT_UPDATE,
  ERR_MEASURE_INVALID_FIND_REQUEST,
  getError
};


