const Config = require('./config');

const ERR_GOLFEUR_NOM_NOT_DEFINED = 800;
const ERR_GOLFEUR_PRENOM_NOT_DEFINED = 801;
const ERR_GOLFEUR_EMAIL_NOT_VALID = 802;
const ERR_GOLFEUR_MOT_DE_PASSE_NOT_DEFINED = 803;

const ERR_GOLFEUR_CANNOT_CREATE = 810;
const ERR_GOLFEUR_CANNOT_FIND_ID = 811;
const ERR_GOLFEUR_INVALID_FIND_ID_REQUEST = 812;
const ERR_GOLFEUR_CANNOT_UPDATE = 813;
const ERR_GOLFEUR_INVALID_FIND_REQUEST = 814;
const ERR_GOLFEUR_CANNOT_DELETE = 815;

const golfeurErrors = [
    { number: ERR_GOLFEUR_NOM_NOT_DEFINED, status: 400, message: { en: 'no nom field is provided', fr: 'aucun champ nom n\'est fourni' } },
    { number: ERR_GOLFEUR_PRENOM_NOT_DEFINED, status: 400, message: { en: 'no prenom field is provided', fr: 'aucun champ prénom n\'est fourni' } },
    { number: ERR_GOLFEUR_EMAIL_NOT_VALID, status: 400, message: { en: 'email is not a valid format', fr: 'l\'e-mail n\'est pas au format valide' } },
    { number: ERR_GOLFEUR_MOT_DE_PASSE_NOT_DEFINED, status: 400, message: { en: 'no mot_de_passe field is provided', fr: 'aucun champ mot de passe n\'est fourni' } },
    { number: ERR_GOLFEUR_CANNOT_CREATE, status: 400, message: { en: 'cannot create a golfeur', fr: 'impossible de créer un golfeur' } },
    { number: ERR_GOLFEUR_CANNOT_FIND_ID, status: 400, message: { en: 'cannot find a golfeur from its id', fr: 'impossible de trouver un golfeur par son id' } },
    { number: ERR_GOLFEUR_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'invalid request to get a golfeur from its id', fr: 'requête invalide pour obtenir un golfeur par son id' } },
    { number: ERR_GOLFEUR_CANNOT_UPDATE, status: 400, message: { en: 'cannot update a golfeur', fr: 'impossible de mettre à jour un golfeur' } },
    { number: ERR_GOLFEUR_INVALID_FIND_REQUEST, status: 400, message: { en: 'invalid find all golfeurs request', fr: 'requête invalide pour trouver tous les golfeurs' } },
    { number: ERR_GOLFEUR_CANNOT_DELETE, status: 400, message: { en: 'cannot delete a golfeur', fr: 'impossible de supprimer un golfeur' } },
];

const getError = (number, lang) => {
    if (lang === undefined) lang = Config.defaultLang;
    let err = golfeurErrors.find(e => e.number === number);
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
    ERR_GOLFEUR_NOM_NOT_DEFINED,
    ERR_GOLFEUR_PRENOM_NOT_DEFINED,
    ERR_GOLFEUR_EMAIL_NOT_VALID,
    ERR_GOLFEUR_MOT_DE_PASSE_NOT_DEFINED,
    ERR_GOLFEUR_CANNOT_CREATE,
    ERR_GOLFEUR_CANNOT_FIND_ID,
    ERR_GOLFEUR_INVALID_FIND_ID_REQUEST,
    ERR_GOLFEUR_CANNOT_UPDATE,
    ERR_GOLFEUR_INVALID_FIND_REQUEST,
    ERR_GOLFEUR_CANNOT_DELETE,
    getError,
};
