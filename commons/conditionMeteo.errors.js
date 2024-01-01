const Config = require('./config');

const ERR_CM_TROU_ID_NOT_DEFINED = 1100;
const ERR_CM_DATE_NOT_DEFINED = 1101;
const ERR_CM_TEMPERATURE_NOT_DEFINED = 1102;
const ERR_CM_HUMIDITE_NOT_DEFINED = 1103;
const ERR_CM_VENT_NOT_DEFINED = 1104;
const ERR_CM_VENT_VITESSE_NOT_DEFINED = 1105;
const ERR_CM_VENT_DIRECTION_NOT_DEFINED = 1106;

const ERR_CM_INVALID_FIND_CM_REQUEST = 1110;
const ERR_CM_CANNOT_CREATE = 1111;
const ERR_CM_CANNOT_FIND_ID = 1112;
const ERR_CM_INVALID_FIND_ID_REQUEST = 1113;
const ERR_CM_CANNOT_UPDATE = 1114;
const ERR_CM_INVALID_FIND_REQUEST = 1115;
const ERR_CM_CANNOT_DELETE = 1116;
const ERR_CM_TROU_INVALID_FIND_REQUEST = 1117;


const conditionMeteoErrors = [
    { number: ERR_CM_TROU_ID_NOT_DEFINED, status: 400, message: { en: 'no trou_id field is provided', fr: 'aucun champ trou_id n\'est fourni' } },
    { number: ERR_CM_DATE_NOT_DEFINED, status: 400, message: { en: 'no date field is provided', fr: 'aucun champ date n\'est fourni' } },
    { number: ERR_CM_TEMPERATURE_NOT_DEFINED, status: 400, message: { en: 'no temperature field is provided', fr: 'aucun champ temperature n\'est fourni' } },
    { number: ERR_CM_HUMIDITE_NOT_DEFINED, status: 400, message: { en: 'no humidite field is provided', fr: 'aucun champ humidite n\'est fourni' } },
    { number: ERR_CM_VENT_NOT_DEFINED, status: 400, message: { en: 'no vent field is provided', fr: 'aucun champ vent n\'est fourni' } },
    { number: ERR_CM_VENT_VITESSE_NOT_DEFINED, status: 400, message: { en: 'vent vitesse is not valid', fr: 'vitesse de vent non valide' } },
    { number: ERR_CM_VENT_DIRECTION_NOT_DEFINED, status: 400, message: { en: 'vent direction is not valid', fr: 'direction de vent non valide' } },
    { number: ERR_CM_INVALID_FIND_CM_REQUEST, status: 400, message: { en: 'cannot find a condition meteo by its parameters', fr: 'impossible de trouver une condition météo avec ses paramètres' } },
    { number: ERR_CM_CANNOT_CREATE, status: 400, message: { en: 'cannot create a condition meteo', fr: 'impossible de créer une condition météo' } },
    { number: ERR_CM_CANNOT_FIND_ID, status: 400, message: { en: 'cannot find a condition meteo from its id', fr: 'impossible de trouver une condition météo par son id' } },
    { number: ERR_CM_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'invalid request to get a condition meteo from its id', fr: 'requête invalide pour obtenir une condition météo par son id' } },
    { number: ERR_CM_CANNOT_UPDATE, status: 400, message: { en: 'cannot update a condition meteo', fr: 'impossible de mettre à jour une condition météo' } },
    { number: ERR_CM_INVALID_FIND_REQUEST, status: 400, message: { en: 'invalid find all conditions meteo request', fr: 'requête invalide pour trouver toutes les conditions météo' } },
    { number: ERR_CM_CANNOT_DELETE, status: 400, message: { en: 'cannot delete a condition meteo', fr: 'impossible de supprimer une condition météo' } },
    { number: ERR_CM_TROU_INVALID_FIND_REQUEST, status: 400, message: { en: 'invalid find all conditions meteo request', fr: 'requête invalide pour trouver toutes les conditions météo' } },
];

const getError = (number, lang) => {
    if (lang === undefined) lang = Config.defaultLang;
    let err = conditionMeteoErrors.find(e => e.number === number);
    if (err !== undefined) {
        if (lang === 'en') {
            return {
                error: err.number,
                status: err.status,
                data: err.message.en,
            };
        } else if (lang === 'fr') {
            return {
                error: err.number,
                status: err.status,
                data: err.message.fr,
            };
        }
    }
    return {
        error: 1,
        status: 500,
        data: 'undetermined error',
    };
};

module.exports = {
    ERR_CM_TROU_ID_NOT_DEFINED,
    ERR_CM_DATE_NOT_DEFINED,
    ERR_CM_TEMPERATURE_NOT_DEFINED,
    ERR_CM_HUMIDITE_NOT_DEFINED,
    ERR_CM_VENT_NOT_DEFINED,
    ERR_CM_VENT_VITESSE_NOT_DEFINED,
    ERR_CM_VENT_DIRECTION_NOT_DEFINED,
    ERR_CM_INVALID_FIND_CM_REQUEST,
    ERR_CM_CANNOT_CREATE,
    ERR_CM_CANNOT_FIND_ID,
    ERR_CM_INVALID_FIND_ID_REQUEST,
    ERR_CM_CANNOT_UPDATE,
    ERR_CM_INVALID_FIND_REQUEST,
    ERR_CM_CANNOT_DELETE,
    ERR_CM_TROU_INVALID_FIND_REQUEST,
    getError,
};
