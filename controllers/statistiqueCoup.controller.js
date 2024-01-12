const StatistiqueCoup = require('../models/statistiqueCoup.model');
const Golfeur = require('../models/golfeur.model');
const StatistiqueCoupErrors = require('../commons/statistiqueCoup.errors');
const { answer } = require('./ControllerAnswer');
const ModuleErrors = require('../commons/module.errors');
const Trou = require("../models/trou.model");

function checkGolfeurId(golfeurId) {
    if (golfeurId === undefined) {
        answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_GOLFEUR_ID_NOT_VALID));
        return false;
    }
    return true;
}

function checkVitesse(vitesse) {
    if (vitesse === undefined || typeof vitesse !== 'number' || isNaN(vitesse)) {
        answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_VITESSE_NOT_VALID));
        return false;
    }
    return true;
}

function checkTrajectoire(trajectoire) {
    if (trajectoire === undefined || typeof trajectoire !== 'number' || isNaN(trajectoire)) {
        answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_TRAJECTOIRE_NOT_VALID));
        return false;
    }
    return true;
}

function checkConseils(conseils) {
    // Vous pouvez ajouter des validations spécifiques ici selon vos besoins
    return true;
}

/**
 * Crée une nouvelle statistique de coup
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {string} req.body.golfeur_id - L'ID du golfeur associé à la statistique de coup
 * @param {string} req.body.trou_id - L'ID du trou associé à la statistique de coup
 * @param {number} req.body.vitesse - La vitesse du coup
 * @param {number} req.body.trajectoire - La trajectoire du coup
 * @param {string} req.body.conseils - Les conseils liés au coup
 * @param {number} req.body.latitude_depart - La latitude du point de départ
 * @param {number} req.body.longitude_depart - La longitude du point de départ
 * @param {number} req.body.latitude_arrivee - La latitude du point d'arrivée
 * @param {number} req.body.longitude_arrivee - La longitude du point d'arrivée
 * @param {number} req.body.acceleration_x - L'accélération sur l'axe X
 * @param {number} req.body.acceleration_y - L'accélération sur l'axe Y
 * @param {Function} next - La prochaine middleware à appeler
 * @alias module:StatistiqueCoupController.create
 */
const create = async function (req, res, next) {
    answer.reset();
    // Vérification de la validité des paramètres
    if (
        !checkGolfeurId(req.body.golfeur_id) ||
        !checkVitesse(req.body.vitesse) ||
        !checkTrajectoire(req.body.trajectoire) ||
        !checkConseils(req.body.conseils)
    ) {
        return next(answer);
    }
    let golfeur = null;
    let trou = null;

    try {
        golfeur = await Golfeur.findOne({ _id: req.body.golfeur_id }).exec();
        trou = await Trou.findOne({ numero: req.body.trou_id }).exec();

        if (golfeur === null || trou === null) {
            answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_GOLFEUR_OR_TROU_NOT_VALID));
            return next(answer);
        }
    } catch (err) {
        answer.set(ModuleErrors.getError(ModuleErrors.ERR_INTERNAL_SERVER));
        return next(answer);
    }

    const statistiqueCoupData = {
        golfeur_id: golfeur._id,
        trou_id: trou._id,
        date: new Date(),
        vitesse: req.body.vitesse,
        trajectoire: req.body.trajectoire,
        conseils: req.body.conseils,
        latitude_depart: req.body.latitude_depart,
        longitude_depart: req.body.longitude_depart,
        latitude_arrivee: req.body.latitude_arrivee,
        longitude_arrivee: req.body.longitude_arrivee,
        acceleration_x: req.body.acceleration_x,
        acceleration_y: req.body.acceleration_y,
    };

    // Création de la statistique de coup
    StatistiqueCoup.create(statistiqueCoupData, async function (err, statistiqueCoup) {
        if (err) {
            answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_CANNOT_CREATE));
            answer.data = answer.data + '\n' + err;
            return next(answer);
        }

        if (statistiqueCoup === null) {
            answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_CANNOT_CREATE));
            return next(answer);
        } else {
            // Renvoie toutes les données de la statistique de coup
            answer.data = statistiqueCoup;
            res.status(201).send(answer);
        }
    });
};

/**
 * Met à jour une statistique de coup existante
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.idStatistiqueCoup - L'ID de la statistique de coup à mettre à jour
 * @param {Object} req.body.data - Les données à mettre à jour (normalement toutes les propriétés)
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 * @alias module:StatistiqueCoupController.update
 */
const update = async function (req, res, next) {
    answer.reset();

    // Vérification de la validité des données
    if (!checkData(req.body.data)) {
        return next(answer);
    }

    let statistiqueCoup = null;

    // Vérification de l'existence de la statistique de coup
    try {
        statistiqueCoup = await StatistiqueCoup.findOne({ _id: req.body.idStatistiqueCoup }).exec();
        if (statistiqueCoup === null) {
            answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_INVALID_FIND_ID_REQUEST));
        return next(answer);
    }

    // Mise à jour des données de la statistique de coup
    try {
        statistiqueCoup.set(req.body.data);
    } catch (err) {
        console.log('Erreur lors de la mise à jour de la statistique de coup');
        answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_CANNOT_UPDATE));
        return next(answer);
    }

    // Sauvegarde des modifications
    statistiqueCoup.save(async function (err) {
        if (err) {
            answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_CANNOT_UPDATE));
            return next(answer);
        }

        // Renvoie toutes les données de la statistique de coup
        answer.data = statistiqueCoup;
        res.status(200).send(answer);
    });
};

/**
 * Récupère toutes les statistiques de coup
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 */
const getStatistiquesCoups = async function (req, res, next) {
    answer.reset();

    let statistiquesCoups = null;

    // Récupération de toutes les statistiques de coup
    try {
        statistiquesCoups = await StatistiqueCoup.find({}).exec();
    } catch (err) {
        answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_INVALID_FIND_REQUEST));
        return next(answer);
    }

    // Renvoie toutes les statistiques de coup
    answer.data = statistiquesCoups;
    res.status(200).send(answer);
};

/**
 * Supprime une statistique de coup
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.idStatistiqueCoup - L'ID de la statistique de coup à supprimer
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 * @alias module:StatistiqueCoupController.deleteStatistiqueCoup
 */
const deleteStatistiqueCoup = async function (req, res, next) {
    answer.reset();

    let statistiqueCoup = null;

    // Vérification de l'existence de la statistique de coup
    try {
        statistiqueCoup = await StatistiqueCoup.findOne({ _id: req.body.idStatistiqueCoup }).exec();
        if (statistiqueCoup === null) {
            answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_INVALID_FIND_ID_REQUEST));
        return next(answer);
    }

    // Suppression de la statistique de coup
    try {
        await StatistiqueCoup.deleteOne({ _id: req.body.idStatistiqueCoup }).exec();
    } catch (err) {
        answer.set(StatistiqueCoupErrors.getError(StatistiqueCoupErrors.ERR_STATISTIQUE_COUP_CANNOT_DELETE));
        return next(answer);
    }

    // Renvoie toutes les statistiques de coup
    answer.data = statistiqueCoup;
    res.status(200).send(answer);
}
module.exports = {
    create,
    update,
    getStatistiquesCoups,
    deleteStatistiqueCoup,
};
