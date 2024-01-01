const Config = require('./config');

const ERR_TROU_NUMERO_NOT_DEFINED = 900;
const ERR_TROU_GESTIONNAIRE_ID_NOT_DEFINED = 901;
const ERR_TROU_DRAPEAU_ID_NOT_DEFINED = 902;

const ERR_TROU_CANNOT_CREATE = 910;
const ERR_TROU_CANNOT_FIND_ID = 911;
const ERR_TROU_INVALID_FIND_ID_REQUEST = 912;
const ERR_TROU_CANNOT_UPDATE = 913;
const ERR_TROU_INVALID_FIND_REQUEST = 914;
const ERR_TROU_CANNOT_DELETE = 915;
const ERR_TROU_GESTIONNAIRE_OR_DRAPEAU_NOT_FOUND = 916;

const trouErrors = [
    { number: ERR_TROU_NUMERO_NOT_DEFINED, status: 400, message: { en: 'no numero field is provided', fr: 'aucun champ numéro n\'est fourni' } },
    { number: ERR_TROU_GESTIONNAIRE_ID_NOT_DEFINED, status: 400, message: { en: 'no gestionnaire_id field is provided', fr: 'aucun champ gestionnaire_id n\'est fourni' } },
    { number: ERR_TROU_DRAPEAU_ID_NOT_DEFINED, status: 400, message: { en: 'no drapeau_id field is provided', fr: 'aucun champ drapeau_id n\'est fourni' } },
    { number: ERR_TROU_CANNOT_CREATE, status: 400, message: { en: 'cannot create a trou', fr: 'impossible de créer un trou' } },
    { number: ERR_TROU_CANNOT_FIND_ID, status: 400, message: { en: 'cannot find a trou from its id', fr: 'impossible de trouver un trou par son id' } },
    { number: ERR_TROU_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'invalid request to get a trou from its id', fr: 'requête invalide pour obtenir un trou par son id' } },
    { number: ERR_TROU_CANNOT_UPDATE, status: 400, message: { en: 'cannot update a trou', fr: 'impossible de mettre à jour un trou' } },
    { number: ERR_TROU_INVALID_FIND_REQUEST, status: 400, message: { en: 'invalid find all trous request', fr: 'requête invalide pour trouver tous les trous' } },
    { number: ERR_TROU_CANNOT_DELETE, status: 400, message: { en: 'cannot delete a trou', fr: 'impossible de supprimer un trou' } },
    { number: ERR_TROU_GESTIONNAIRE_OR_DRAPEAU_NOT_FOUND, status: 400, message: { en: 'cannot find a gestionnaire or a drapeau from its id', fr: 'impossible de trouver un gestionnaire ou un drapeau par son id' } },
];

const getError = (number, lang) => {
    if (lang === undefined) lang = Config.defaultLang;
    let err = trouErrors.find(e => e.number === number);
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
    ERR_TROU_NUMERO_NOT_DEFINED,
    ERR_TROU_GESTIONNAIRE_ID_NOT_DEFINED,
    ERR_TROU_DRAPEAU_ID_NOT_DEFINED,
    ERR_TROU_CANNOT_CREATE,
    ERR_TROU_CANNOT_FIND_ID,
    ERR_TROU_INVALID_FIND_ID_REQUEST,
    ERR_TROU_CANNOT_UPDATE,
    ERR_TROU_INVALID_FIND_REQUEST,
    ERR_TROU_CANNOT_DELETE,
    ERR_TROU_GESTIONNAIRE_OR_DRAPEAU_NOT_FOUND,
    getError,
};
