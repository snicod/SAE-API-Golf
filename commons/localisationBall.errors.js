const Config = require('./config');

const ERR_LB_GOLFEUR_ID_NOT_DEFINED = 1400;
const ERR_LB_LATITUDE_NOT_DEFINED = 1401;
const ERR_LB_LONGITUDE_NOT_DEFINED = 1402;
const ERR_LB_INVALID_FIND_LB_REQUEST = 1403;
const ERR_LB_CANNOT_CREATE = 1404;
const ERR_LB_INVALID_FIND_GOLFEUR_REQUEST = 1405;
const ERR_LB_CANNOT_FIND_ID = 1406;
const ERR_LB_INVALID_FIND_ID_REQUEST = 1407;
const ERR_LB_CANNOT_UPDATE = 1408;
const ERR_LB_INVALID_FIND_REQUEST = 1409;
const ERR_LB_CANNOT_DELETE = 1410;

// Error messages for each error code
const localisationBallErrors = [
    { number: ERR_LB_GOLFEUR_ID_NOT_DEFINED, status: 400, message: { en: 'Golfeur ID is not defined', fr: 'L\'ID du golfeur n\'est pas défini' }},
    { number: ERR_LB_LATITUDE_NOT_DEFINED, status: 400, message: { en: 'Latitude is not defined', fr: 'La latitude n\'est pas définie' }},
    { number: ERR_LB_LONGITUDE_NOT_DEFINED, status: 400, message: { en: 'Longitude is not defined', fr: 'La longitude n\'est pas définie' }},
    { number: ERR_LB_INVALID_FIND_LB_REQUEST, status: 400, message: { en: 'Invalid request to find localisationBall', fr: 'Requête invalide pour trouver une localisationBall' }},
    { number: ERR_LB_CANNOT_CREATE, status: 400, message: { en: 'Cannot create localisationBall', fr: 'Impossible de créer une localisationBall' }},
    { number: ERR_LB_INVALID_FIND_GOLFEUR_REQUEST, status: 400, message: { en: 'Invalid request to find golfeur', fr: 'Requête invalide pour trouver un golfeur' }},
    { number: ERR_LB_CANNOT_FIND_ID, status: 400, message: { en: 'Cannot find localisationBall by ID', fr: 'Impossible de trouver une localisationBall par son ID' }},
    { number: ERR_LB_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'Invalid request to find localisationBall by ID', fr: 'Requête invalide pour trouver une localisationBall par son ID' }},
    { number: ERR_LB_CANNOT_UPDATE, status: 400, message: { en: 'Cannot update localisationBall', fr: 'Impossible de mettre à jour une localisationBall' }},
    { number: ERR_LB_INVALID_FIND_REQUEST, status: 400, message: { en: 'Invalid request to find all localisationBalls', fr: 'Requête invalide pour trouver toutes les localisationsBalls' }},
    { number: ERR_LB_CANNOT_DELETE, status: 400, message: { en: 'Cannot delete localisationBall', fr: 'Impossible de supprimer une localisationBall' }},
];

const getError = (number, lang) => {
    if (lang === undefined) lang = Config.defaultLang;
    let err = localisationBallErrors.find(e => e.number === number);
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
    ERR_LB_GOLFEUR_ID_NOT_DEFINED,
    ERR_LB_LATITUDE_NOT_DEFINED,
    ERR_LB_LONGITUDE_NOT_DEFINED,
    ERR_LB_INVALID_FIND_LB_REQUEST,
    ERR_LB_CANNOT_CREATE,
    ERR_LB_INVALID_FIND_GOLFEUR_REQUEST,
    ERR_LB_CANNOT_FIND_ID,
    ERR_LB_INVALID_FIND_ID_REQUEST,
    ERR_LB_CANNOT_UPDATE,
    ERR_LB_INVALID_FIND_REQUEST,
    ERR_LB_CANNOT_DELETE,
    getError
};