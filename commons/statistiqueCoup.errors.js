const Config = require('./config');

const ERR_STATISTIQUE_COUP_GOLFEUR_ID_NOT_DEFINED = 1000;
const ERR_STATISTIQUE_COUP_VITESSE_NOT_VALID = 1001;
const ERR_STATISTIQUE_COUP_TRAJECTOIRE_NOT_VALID = 1002;

const ERR_STATISTIQUE_COUP_CANNOT_CREATE = 1010;
const ERR_STATISTIQUE_COUP_CANNOT_FIND_ID = 1011;
const ERR_STATISTIQUE_COUP_INVALID_FIND_ID_REQUEST = 1012;
const ERR_STATISTIQUE_COUP_CANNOT_UPDATE = 1013;
const ERR_STATISTIQUE_COUP_INVALID_FIND_REQUEST = 1014;
const ERR_STATISTIQUE_COUP_CANNOT_DELETE = 1015;
const ERR_STATISTIQUE_COUP_GOLFEUR_OR_TROU_NOT_VALID = 1016;

const statistiqueCoupErrors = [
    { number: ERR_STATISTIQUE_COUP_GOLFEUR_ID_NOT_DEFINED, status: 400, message: { en: 'no golfeur_id field is provided', fr: 'aucun champ golfeur_id n\'est fourni' } },
    { number: ERR_STATISTIQUE_COUP_VITESSE_NOT_VALID, status: 400, message: { en: 'vitesse is not a valid number', fr: 'la vitesse n\'est pas un nombre valide' } },
    { number: ERR_STATISTIQUE_COUP_TRAJECTOIRE_NOT_VALID, status: 400, message: { en: 'trajectoire is not a valid number', fr: 'la trajectoire n\'est pas un nombre valide' } },
    { number: ERR_STATISTIQUE_COUP_CANNOT_CREATE, status: 400, message: { en: 'cannot create a statistiqueCoup', fr: 'impossible de créer une statistique de coup' } },
    { number: ERR_STATISTIQUE_COUP_CANNOT_FIND_ID, status: 400, message: { en: 'cannot find a statistiqueCoup from its id', fr: 'impossible de trouver une statistique de coup par son id' } },
    { number: ERR_STATISTIQUE_COUP_INVALID_FIND_ID_REQUEST, status: 400, message: { en: 'invalid request to get a statistiqueCoup from its id', fr: 'requête invalide pour obtenir une statistique de coup par son id' } },
    { number: ERR_STATISTIQUE_COUP_CANNOT_UPDATE, status: 400, message: { en: 'cannot update a statistiqueCoup', fr: 'impossible de mettre à jour une statistique de coup' } },
    { number: ERR_STATISTIQUE_COUP_INVALID_FIND_REQUEST, status: 400, message: { en: 'invalid find all statistiqueCoup request', fr: 'requête invalide pour trouver toutes les statistiques de coup' } },
    { number: ERR_STATISTIQUE_COUP_CANNOT_DELETE, status: 400, message: { en: 'cannot delete a statistiqueCoup', fr: 'impossible de supprimer une statistique de coup' } },
    { number: ERR_STATISTIQUE_COUP_GOLFEUR_OR_TROU_NOT_VALID, status: 400, message: { en: 'golfeur_id is not valid', fr: 'l\'id du golfeur ou le numéro du trou n\'est pas valide' } },
];

const getError = (number, lang) => {
    if (lang === undefined) lang = Config.defaultLang;
    let err = statistiqueCoupErrors.find(e => e.number === number);
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
    ERR_STATISTIQUE_COUP_GOLFEUR_ID_NOT_DEFINED,
    ERR_STATISTIQUE_COUP_VITESSE_NOT_VALID,
    ERR_STATISTIQUE_COUP_TRAJECTOIRE_NOT_VALID,
    ERR_STATISTIQUE_COUP_CANNOT_CREATE,
    ERR_STATISTIQUE_COUP_CANNOT_FIND_ID,
    ERR_STATISTIQUE_COUP_INVALID_FIND_ID_REQUEST,
    ERR_STATISTIQUE_COUP_CANNOT_UPDATE,
    ERR_STATISTIQUE_COUP_INVALID_FIND_REQUEST,
    ERR_STATISTIQUE_COUP_CANNOT_DELETE,
    ERR_STATISTIQUE_COUP_GOLFEUR_OR_TROU_NOT_VALID,
    getError,
};
