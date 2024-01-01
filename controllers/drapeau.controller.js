const Drapeau = require('../models/drapeau.model');
const DrapeauErrors = require('../commons/drapeau.errors');
const { answer } = require('./ControllerAnswer');
const ModuleErrors = require('../commons/module.errors');

function checkLatitude(latitude) {
    if (latitude === undefined || typeof latitude !== 'number' || isNaN(latitude)) {
        answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_LATITUDE_NOT_VALID));
        return false;
    }
    return true;
}

function checkLongitude(longitude) {
    if (longitude === undefined || typeof longitude !== 'number' || isNaN(longitude)) {
        answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_LONGITUDE_NOT_VALID));
        return false;
    }
    return true;
}

/**
 * Crée un nouveau drapeau
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {number} req.body.latitude - La latitude du drapeau
 * @param {number} req.body.longitude - La longitude du drapeau
 * @param {Function} next - La prochaine middleware à appeler
 * @alias module:DrapeauController.create
 */
const create = async function (req, res, next) {
    answer.reset();

    // Vérification de la validité des paramètres
    if (!checkLatitude(req.body.latitude) || !checkLongitude(req.body.longitude)) {
        return next(answer);
    }

    const drapeauData = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    };

    // Création du drapeau
    Drapeau.create(drapeauData, async function (err, drapeau) {
        if (err) {
            answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_CANNOT_CREATE));
            answer.data = answer.data + '\n' + err;
            return next(answer);
        }

        if (drapeau === null) {
            answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_CANNOT_CREATE));
            return next(answer);
        } else {
            // Renvoie toutes les données du drapeau
            answer.data = drapeau;
            res.status(201).send(answer);
        }
    });
};

/**
 * Met à jour un drapeau existant
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.idDrapeau - L'ID du drapeau à mettre à jour
 * @param {Object} req.body.data - Les données à mettre à jour (normalement toutes les propriétés)
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 * @alias module:DrapeauController.update
 */
const update = async function (req, res, next) {
    answer.reset();

    // Vérification de la validité des données
    if (!checkData(req.body.data)) {
        return next(answer);
    }

    let drapeau = null;

    // Vérification de l'existence du drapeau
    try {
        drapeau = await Drapeau.findOne({ _id: req.body.idDrapeau }).exec();
        if (drapeau === null) {
            answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_INVALID_FIND_ID_REQUEST));
        return next(answer);
    }

    // Mise à jour des données du drapeau
    try {
        drapeau.set(req.body.data);
    } catch (err) {
        console.log('Erreur lors de la mise à jour du drapeau');
        answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_CANNOT_UPDATE));
        return next(answer);
    }

    // Sauvegarde des modifications
    drapeau.save(async function (err) {
        if (err) {
            answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_CANNOT_UPDATE));
            return next(answer);
        }

        // Renvoie toutes les données du drapeau
        answer.data = drapeau;
        res.status(200).send(answer);
    });
};

/**
 * Récupère tous les drapeaux
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 */
const getDrapeaux = async function (req, res, next) {
    answer.reset();

    let drapeaux = null;

    // Récupération de tous les drapeaux
    try {
        drapeaux = await Drapeau.find({}).exec();
    } catch (err) {
        answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_INVALID_FIND_REQUEST));
        return next(answer);
    }

    // Renvoie tous les drapeaux
    answer.data = drapeaux;
    res.status(200).send(answer);
};
/**
 * Supprime un drapeau par ID
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.idDrapeau - L'ID du drapeau à supprimer
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 * @alias module:DrapeauController.deleteDrapeau
 */
const deleteDrapeau = async function (req, res, next) {
    answer.reset();

    let drapeau = null;

    // Vérification de l'existence du drapeau
    try {
        drapeau = await Drapeau.findOne({ _id: req.body.idDrapeau }).exec();
        if (drapeau === null) {
            answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_INVALID_FIND_ID_REQUEST));
        return next(answer);
    }

    // Suppression du drapeau
    try {
        await Drapeau.deleteOne({ _id: req.body.idDrapeau }).exec();
    } catch (err) {
        answer.set(DrapeauErrors.getError(DrapeauErrors.ERR_DRAPEAU_CANNOT_DELETE));
        return next(answer);
    }

    // Renvoie toutes les statistiques de coup
    answer.data = drapeau;
    res.status(200).send(answer);
}


module.exports = {
    create,
    update,
    getDrapeaux,
    deleteDrapeau,
};
