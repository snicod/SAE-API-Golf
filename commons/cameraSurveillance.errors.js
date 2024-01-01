const Config = require('./config');

const ERR_CS_TROU_ID_NOT_DEFINED = 1300;
const ERR_CS_DATE_NOT_DEFINED = 1301;
const ERR_CS_VIDEO_URL_NOT_DEFINED = 1302;
const ERR_CS_INVALID_FIND_CS_REQUEST = 1303;
const ERR_CS_CANNOT_CREATE = 1304;
const ERR_CS_INVALID_FIND_TROU_REQUEST = 1305;
const ERR_CS_CANNOT_FIND_ID = 1306;
const ERR_CS_INVALID_FIND_ID_REQUEST = 1307;
const ERR_CS_CANNOT_UPDATE = 1308;
const ERR_CS_CANNOT_DELETE = 1309;
const ERR_CS_INVALID_FIND_REQUEST = 1310;

// Error messages for each error code
const cameraSurveillanceErrors = [
    { number: ERR_CS_TROU_ID_NOT_DEFINED, status: 400, message: { en: 'Trou ID is not defined', fr: 'L\'ID du trou n\'est pas défini' }},
    { number: ERR_CS_DATE_NOT_DEFINED, status: 400, message: { en: 'Date is not defined', fr: 'La date n\'est pas définie' }},
    { number: ERR_CS_VIDEO_URL_NOT_DEFINED, status: 400, message: { en: 'Video URL is not defined', fr: 'L\'URL de la vidéo n\'est pas définie' }},
    { number: ERR_CS_INVALID_FIND_CS_REQUEST, status: 400, message: { en: 'Invalid request to find CameraSurveillance', fr: 'Requête invalide pour trouver une CameraSurveillance' }},
    { number: ERR_CS_CANNOT_CREATE, status: 400, message: { en: 'Cannot create CameraSurveillance', fr: 'Impossible de créer une CameraSurveillance' }},
    { number: ERR_CS_INVALID_FIND_TROU_REQUEST, status: 400, message: { en: 'Invalid request to find Trou', fr: 'Requête invalide pour trouver un Trou' }},
    { number: ERR_CS_CANNOT_FIND_ID, status: 400, message: { en: 'Cannot find CameraSurveillance by ID', fr: 'Impossible de trouver une CameraSurveillance par son ID' }},
    { number: ERR_CS_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'Invalid request to find CameraSurveillance by ID', fr: 'Requête invalide pour trouver une CameraSurveillance par son ID' }},
    { number: ERR_CS_CANNOT_UPDATE, status: 400, message: { en: 'Cannot update CameraSurveillance', fr: 'Impossible de mettre à jour une CameraSurveillance' }},
    { number: ERR_CS_CANNOT_DELETE, status: 400, message: { en: 'Cannot delete CameraSurveillance', fr: 'Impossible de supprimer une CameraSurveillance' }},
    { number: ERR_CS_INVALID_FIND_REQUEST, status: 400, message: { en: 'Invalid request to find all CameraSurveillance', fr: 'Requête invalide pour trouver toutes les CameraSurveillance' }},
];

const getError = (number, lang) => {
    if (lang === undefined) lang = Config.defaultLang;
    let err = cameraSurveillanceErrors.find(e => e.number === number);
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
    ERR_CS_TROU_ID_NOT_DEFINED,
    ERR_CS_DATE_NOT_DEFINED,
    ERR_CS_VIDEO_URL_NOT_DEFINED,
    ERR_CS_INVALID_FIND_CS_REQUEST,
    ERR_CS_CANNOT_CREATE,
    ERR_CS_INVALID_FIND_TROU_REQUEST,
    ERR_CS_CANNOT_FIND_ID,
    ERR_CS_INVALID_FIND_ID_REQUEST,
    ERR_CS_CANNOT_UPDATE,
    ERR_CS_CANNOT_DELETE,
    ERR_CS_INVALID_FIND_REQUEST,
    getError
};