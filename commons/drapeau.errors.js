const Config = require('./config');

const ERR_DRAPEAU_LATITUDE_NOT_VALID = 700;
const ERR_DRAPEAU_LONGITUDE_NOT_VALID = 701;

const ERR_DRAPEAU_CANNOT_CREATE = 710;
const ERR_DRAPEAU_CANNOT_FIND_ID = 711;
const ERR_DRAPEAU_INVALID_FIND_ID_REQUEST = 712;
const ERR_DRAPEAU_CANNOT_UPDATE = 713;
const ERR_DRAPEAU_INVALID_FIND_REQUEST = 714;
const ERR_DRAPEAU_CANNOT_DELETE = 715;

const drapeauErrors = [
    { number: ERR_DRAPEAU_LATITUDE_NOT_VALID, status: 400, message: { en: 'latitude is not a valid number', fr: 'la latitude n\'est pas un nombre valide' } },
    { number: ERR_DRAPEAU_LONGITUDE_NOT_VALID, status: 400, message: { en: 'longitude is not a valid number', fr: 'la longitude n\'est pas un nombre valide' } },
    { number: ERR_DRAPEAU_CANNOT_CREATE, status: 400, message: { en: 'cannot create a drapeau', fr: 'impossible de créer un drapeau' } },
    { number: ERR_DRAPEAU_CANNOT_FIND_ID, status: 400, message: { en: 'cannot find a drapeau from its id', fr: 'impossible de trouver un drapeau par son id' } },
    { number: ERR_DRAPEAU_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'invalid request to get a drapeau from its id', fr: 'requête invalide pour obtenir un drapeau par son id' } },
    { number: ERR_DRAPEAU_CANNOT_UPDATE, status: 400, message: { en: 'cannot update a drapeau', fr: 'impossible de mettre à jour un drapeau' } },
    { number: ERR_DRAPEAU_INVALID_FIND_REQUEST, status: 400, message: { en: 'invalid find all drapeaux request', fr: 'requête invalide pour trouver tous les drapeaux' } },
    { number: ERR_DRAPEAU_CANNOT_DELETE, status: 400, message: { en: 'cannot delete a drapeau', fr: 'impossible de supprimer un drapeau' } },
];

const getError = (number, lang) => {
    if (lang === undefined) lang = Config.defaultLang;
    let err = drapeauErrors.find(e => e.number === number);
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
    ERR_DRAPEAU_LATITUDE_NOT_VALID,
    ERR_DRAPEAU_LONGITUDE_NOT_VALID,
    ERR_DRAPEAU_CANNOT_CREATE,
    ERR_DRAPEAU_CANNOT_FIND_ID,
    ERR_DRAPEAU_INVALID_FIND_ID_REQUEST,
    ERR_DRAPEAU_CANNOT_UPDATE,
    ERR_DRAPEAU_INVALID_FIND_REQUEST,
    ERR_DRAPEAU_CANNOT_DELETE,
    getError,
};
