const Config = require('./config');

const ERR_ES_TROU_ID_NOT_DEFINED = 1200;
const ERR_ES_DATE_NOT_DEFINED = 1201;
const ERR_ES_DENSITE_HERBE_NOT_DEFINED = 1202;
const ERR_ES_QUALITE_NUTRIMENTS_NOT_DEFINED = 1203;
const ERR_ES_HUMIDITE_SOL_NOT_DEFINED = 1204;
const ERR_ES_INVALID_FIND_ES_REQUEST = 1210;
const ERR_ES_CANNOT_CREATE = 1211;
const ERR_ES_INVALID_FIND_TROU_REQUEST = 1212;
const ERR_ES_CANNOT_FIND_ID = 1213;
const ERR_ES_INVALID_FIND_ID_REQUEST = 1214;
const ERR_ES_CANNOT_UPDATE = 1215;
const ERR_ES_CANNOT_DELETE = 1216;
const ERR_ES_INVALID_FIND_REQUEST = 1217;

// Error messages for each error code
const etatSolErrors = [
    { number: ERR_ES_TROU_ID_NOT_DEFINED, status: 400, message: { en: 'Trou ID is not defined', fr: 'L\'ID du trou n\'est pas défini' }},
    { number: ERR_ES_DATE_NOT_DEFINED, status: 400, message: { en: 'Date is not defined', fr: 'La date n\'est pas définie' }},
    { number: ERR_ES_DENSITE_HERBE_NOT_DEFINED, status: 400, message: { en: 'Densité d\'herbe is not defined', fr: 'La densité d\'herbe n\'est pas définie' }},
    { number: ERR_ES_QUALITE_NUTRIMENTS_NOT_DEFINED, status: 400, message: { en: 'Qualité de nutriments is not defined', fr: 'La qualité de nutriments n\'est pas définie' }},
    { number: ERR_ES_HUMIDITE_SOL_NOT_DEFINED, status: 400, message: { en: 'Humidité du sol is not defined', fr: 'L\'humidité du sol n\'est pas définie' }},
    { number: ERR_ES_INVALID_FIND_ES_REQUEST, status: 400, message: { en: 'Invalid request to find EtatSol', fr: 'Requête invalide pour trouver un EtatSol' }},
    { number: ERR_ES_CANNOT_CREATE, status: 400, message: { en: 'Cannot create EtatSol', fr: 'Impossible de créer un EtatSol' }},
    { number: ERR_ES_INVALID_FIND_TROU_REQUEST, status: 400, message: { en: 'Invalid request to find Trou', fr: 'Requête invalide pour trouver un Trou' }},
    { number: ERR_ES_CANNOT_FIND_ID, status: 400, message: { en: 'Cannot find EtatSol by ID', fr: 'Impossible de trouver un EtatSol par son ID' }},
    { number: ERR_ES_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'Invalid request to find EtatSol by ID', fr: 'Requête invalide pour trouver un EtatSol par son ID' }},
    { number: ERR_ES_CANNOT_UPDATE, status: 400, message: { en: 'Cannot update EtatSol', fr: 'Impossible de mettre à jour un EtatSol' }},
    { number: ERR_ES_CANNOT_DELETE, status: 400, message: { en: 'Cannot delete EtatSol', fr: 'Impossible de supprimer un EtatSol' }},
    { number: ERR_ES_INVALID_FIND_REQUEST, status: 400, message: { en: 'Invalid request to find all EtatsSol', fr: 'Requête invalide pour trouver tous les EtatsSol' }},
];

const getError = (number, lang) => {
    if (lang === undefined) lang = Config.defaultLang;
    let err = etatSolErrors.find(e => e.number === number);
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
    ERR_ES_TROU_ID_NOT_DEFINED,
    ERR_ES_DATE_NOT_DEFINED,
    ERR_ES_DENSITE_HERBE_NOT_DEFINED,
    ERR_ES_QUALITE_NUTRIMENTS_NOT_DEFINED,
    ERR_ES_HUMIDITE_SOL_NOT_DEFINED,
    ERR_ES_INVALID_FIND_ES_REQUEST,
    ERR_ES_CANNOT_CREATE,
    ERR_ES_INVALID_FIND_TROU_REQUEST,
    ERR_ES_CANNOT_FIND_ID,
    ERR_ES_INVALID_FIND_ID_REQUEST,
    ERR_ES_CANNOT_UPDATE,
    ERR_ES_CANNOT_DELETE,
    ERR_ES_INVALID_FIND_REQUEST,
    getError
};