const Trou = require('../models/trou.model');
const GestionnaireTrous = require('../models/gestionnaireTrous.model');
const Drapeau = require('../models/drapeau.model');
const TrouErrors = require('../commons/trou.errors');
const { answer } = require('./ControllerAnswer');
const ModuleErrors = require('../commons/module.errors');

function checkNumero(numero) {
    if (numero === undefined || typeof numero !== 'number' || isNaN(numero)) {
        answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_NUMERO_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkGestionnaireId(gestionnaireId) {
    if (gestionnaireId === undefined || typeof gestionnaireId !== 'string' || gestionnaireId === null) {
        answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_GESTIONNAIRE_ID_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkDrapeauId(drapeauId) {
    if (drapeauId === undefined || typeof drapeauId !== 'string' || drapeauId === null) {
        answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_DRAPEAU_ID_NOT_DEFINED));
        return false;
    }
    return true;
}

/**
 * Crée un nouveau trou
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {number} req.body.numero - Le numéro du trou
 * @param {string} req.body.gestionnaire_id - L'ID du gestionnaire de trous
 * @param {string} req.body.drapeau_id - L'ID du drapeau associé au trou
 * @param {Function} next - La prochaine middleware à appeler
 * @alias module:TrouController.create
 */
const create = async function (req, res, next) {
    answer.reset();

    // Vérification de la validité des paramètres
    if (
        !checkNumero(req.body.numero) ||
        !checkGestionnaireId(req.body.gestionnaire_id) ||
        !checkDrapeauId(req.body.drapeau_id)
    ) {
        return next(answer);
    }

    let gestionnaire = null;
    let drapeau = null;
    gestionnaire = await GestionnaireTrous.findOne({ _id: req.body.gestionnaire_id }).exec();

    drapeau = await Drapeau.findOne({ _id: req.body.drapeau_id }).exec();
    if (gestionnaireTrous === null || drapeau === null) {
        answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_GESTIONNAIRE_OR_DRAPEAU_NOT_FOUND));
        return next(answer);
    }

    gestionnaire = gestionnaire._id;
    drapeau = drapeau._id;

    const trouData = {
        numero: req.body.numero,
        gestionnaire_id: gestionnaire,
        drapeau_id: drapeau,
    };

    // Création du trou
    Trou.create(trouData, async function (err, trou) {
        if (err) {
            answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_CANNOT_CREATE));
            answer.data = answer.data + '\n' + err;
            return next(answer);
        }

        if (trou === null) {
            answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_CANNOT_CREATE));
            return next(answer);
        } else {
            // Renvoie toutes les données du trou
            answer.data = trou;
            res.status(201).send(answer);
        }
    });
};

/**
 * Met à jour un trou existant
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.idTrou - L'ID du trou à mettre à jour
 * @param {Object} req.body.data - Les données à mettre à jour (normalement toutes les propriétés)
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 * @alias module:TrouController.update
 */
const update = async function (req, res, next) {
    answer.reset();

    // Vérification de la validité des données
    if (!checkData(req.body.data)) {
        return next(answer);
    }

    let trou = null;

    // Vérification de l'existence du trou
    try {
        trou = await Trou.findOne({ _id: req.body.idTrou }).exec();
        if (trou === null) {
            answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_INVALID_FIND_ID_REQUEST));
        return next(answer);
    }

    // Mise à jour des données du trou
    try {
        trou.set(req.body.data);
    } catch (err) {
        console.log('Erreur lors de la mise à jour du trou');
        answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_CANNOT_UPDATE));
        return next(answer);
    }

    // Sauvegarde des modifications
    trou.save(async function (err) {
        if (err) {
            answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_CANNOT_UPDATE));
            return next(answer);
        }

        // Renvoie toutes les données du trou
        answer.data = trou;
        res.status(200).send(answer);
    });
};

/**
 * Récupère tous les trous
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 */
const getTrous = async function (req, res, next) {
    answer.reset();

    let trous = null;

    // Récupération de tous les trous
    try {
        trous = await Trou.find({}).exec();
    } catch (err) {
        answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_INVALID_FIND_REQUEST));
        return next(answer);
    }

    // Renvoie tous les trous
    answer.data = trous;
    res.status(200).send(answer);
};
/**
 * Supprime un trou par ID
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.idTrou - L'ID du trou à supprimer
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 * @alias module:TrouController.deleteTrou
 */
const deleteTrou = async function (req, res, next) {
    answer.reset();

    let trou = null;

    // Vérification de l'existence du trou
    try {
        trou = await Trou.findOne({ _id: req.body.idTrou }).exec();
        if (trou === null) {
            answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_INVALID_FIND_ID_REQUEST));
        return next(answer);
    }

    // Suppression du trou
    try {
        await Trou.deleteOne({ _id: req.body.idTrou }).exec();
    } catch (err) {
        answer.set(TrouErrors.getError(TrouErrors.ERR_TROU_CANNOT_DELETE));
        return next(answer);
    }

    // Renvoie le trou supprimé
    answer.data = trou;
    res.status(200).send(answer);
}



module.exports = {
    create,
    update,
    deleteTrou,
    getTrous,
};
