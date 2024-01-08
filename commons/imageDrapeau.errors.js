const Config = require('./config');

const ERR_IMAGESDRAPEAUX_DISTANCE_NOT_VALID = 1601;
const ERR_IMAGESDRAPEAUX_CANNOT_CREATE = 1610;
const ERR_IMAGESDRAPEAUX_CANNOT_FIND_ID = 1611;
const ERR_IMAGESDRAPEAUX_INVALID_FIND_ID_REQUEST = 1612;
const ERR_IMAGESDRAPEAUX_CANNOT_UPDATE = 1613;
const ERR_IMAGESDRAPEAUX_INVALID_FIND_REQUEST = 1614;
const ERR_IMAGESDRAPEAUX_CANNOT_DELETE = 1615;

const imagesDrapeauxErrors = [
    { number: ERR_IMAGESDRAPEAUX_DISTANCE_NOT_VALID, status: 400, message: { en: 'distance_estimee is not a valid number', fr: 'la distance estimée n\'est pas un nombre valide' } },
    { number: ERR_IMAGESDRAPEAUX_CANNOT_CREATE, status: 400, message: { en: 'cannot create an imagesDrapeaux', fr: 'impossible de créer une imagesDrapeaux' } },
    { number: ERR_IMAGESDRAPEAUX_CANNOT_FIND_ID, status: 400, message: { en: 'cannot find an imagesDrapeaux from its id', fr: 'impossible de trouver une imagesDrapeaux par son id' } },
    { number: ERR_IMAGESDRAPEAUX_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'invalid request to get an imagesDrapeaux from its id', fr: 'requête invalide pour obtenir une imagesDrapeaux par son id' } },
    { number: ERR_IMAGESDRAPEAUX_CANNOT_UPDATE, status: 400, message: { en: 'cannot update an imagesDrapeaux', fr: 'impossible de mettre à jour une imagesDrapeaux' } },
    { number: ERR_IMAGESDRAPEAUX_INVALID_FIND_REQUEST, status: 400, message: { en: 'invalid find all imagesDrapeaux request', fr: 'requête invalide pour trouver toutes les imagesDrapeaux' } },
    { number: ERR_IMAGESDRAPEAUX_CANNOT_DELETE, status: 400, message: { en: 'cannot delete an imagesDrapeaux', fr: 'impossible de supprimer une imagesDrapeaux' } },
];

const getError = (number, lang) => {
    if (lang === undefined) lang = Config.defaultLang;
    let err = imagesDrapeauxErrors.find(e => e.number === number);
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
    ERR_IMAGESDRAPEAUX_DISTANCE_NOT_VALID,
    ERR_IMAGESDRAPEAUX_CANNOT_CREATE,
    ERR_IMAGESDRAPEAUX_CANNOT_FIND_ID,
    ERR_IMAGESDRAPEAUX_INVALID_FIND_ID_REQUEST,
    ERR_IMAGESDRAPEAUX_CANNOT_UPDATE,
    ERR_IMAGESDRAPEAUX_INVALID_FIND_REQUEST,
    ERR_IMAGESDRAPEAUX_CANNOT_DELETE,
    getError,
};
