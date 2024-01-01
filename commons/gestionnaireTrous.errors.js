const Config = require('./config');

const ERR_GT_NAME_NOT_DEFINED = 1500;
const ERR_GT_PRENOM_NOT_DEFINED = 1501;
const ERR_GT_EMAIL_NOT_DEFINED = 1502;
const ERR_GT_MDP_NOT_DEFINED = 1503;
const ERR_GT_INVALID_FIND_GT_REQUEST = 1504;
const ERR_GT_CANNOT_CREATE = 1505;
const ERR_GT_CANNOT_FIND_ID = 1506;
const ERR_GT_INVALID_FIND_ID_REQUEST = 1507;
const ERR_GT_CANNOT_UPDATE = 1508;
const ERR_GT_CANNOT_DELETE = 1509;
const ERR_GT_INVALID_FIND_REQUEST = 1510;

// Error messages for each error code
const gestionnaireTrouErrors = [
    { number: ERR_GT_NAME_NOT_DEFINED, status: 400, message: { en: 'Name is not defined', fr: 'Le nom n\'est pas défini' }},
    { number: ERR_GT_PRENOM_NOT_DEFINED, status: 400, message: { en: 'Prenom is not defined', fr: 'Le prénom n\'est pas défini' }},
    { number: ERR_GT_EMAIL_NOT_DEFINED, status: 400, message: { en: 'Email is not defined', fr: 'L\'email n\'est pas défini' }},
    { number: ERR_GT_MDP_NOT_DEFINED, status: 400, message: { en: 'Mot de passe is not defined', fr: 'Le mot de passe n\'est pas défini' }},
    { number: ERR_GT_INVALID_FIND_GT_REQUEST, status: 400, message: { en: 'Invalid request to find GestionnaireTrou', fr: 'Requête invalide pour trouver un GestionnaireTrou' }},
    { number: ERR_GT_CANNOT_CREATE, status: 400, message: { en: 'Cannot create GestionnaireTrou', fr: 'Impossible de créer un GestionnaireTrou' }},
    { number: ERR_GT_CANNOT_FIND_ID, status: 400, message: { en: 'Cannot find GestionnaireTrou by ID', fr: 'Impossible de trouver un GestionnaireTrou par son ID' }},
    { number: ERR_GT_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'Invalid request to find GestionnaireTrou by ID', fr: 'Requête invalide pour trouver un GestionnaireTrou par son ID' }},
    { number: ERR_GT_CANNOT_UPDATE, status: 400, message: { en: 'Cannot update GestionnaireTrou', fr: 'Impossible de mettre à jour un GestionnaireTrou' }},
    { number: ERR_GT_CANNOT_DELETE, status: 400, message: { en: 'Cannot delete GestionnaireTrou', fr: 'Impossible de supprimer un GestionnaireTrou' }},
    { number: ERR_GT_INVALID_FIND_REQUEST, status: 400, message: { en: 'Invalid request to find all GestionnaireTrou', fr: 'Requête invalide pour trouver tous les GestionnaireTrou' }},
];

const getError = (number, lang) => {
    if (lang === undefined) lang = Config.defaultLang;
    let err = gestionnaireTrouErrors.find(e => e.number === number);
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
    ERR_GT_NAME_NOT_DEFINED,
    ERR_GT_PRENOM_NOT_DEFINED,
    ERR_GT_EMAIL_NOT_DEFINED,
    ERR_GT_MDP_NOT_DEFINED,
    ERR_GT_INVALID_FIND_GT_REQUEST,
    ERR_GT_CANNOT_CREATE,
    ERR_GT_CANNOT_FIND_ID,
    ERR_GT_INVALID_FIND_ID_REQUEST,
    ERR_GT_CANNOT_UPDATE,
    ERR_GT_CANNOT_DELETE,
    ERR_GT_INVALID_FIND_REQUEST,
    getError
};