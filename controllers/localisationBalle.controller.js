/**
 * defines methods to know about the Meteo on a golf course
 * @module LocalisationBalleController
 */

const LocalisationBall = require('../models/localisationBalle.model')
const LocalisationBallErrors = require('../commons/localisationBall.errors')
const Golfeur = require('../models/golfeur.model')
const { v4: uuidv4 } = require('uuid');
const Config = require('../commons/config');
const validator = require('validator');
const {answer} = require('./ControllerAnswer')
const ModuleErrors = require("../commons/module.errors");

function checkGolfeur_id(golfeur_id) {
    if (golfeur_id === undefined) {
        answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_GOLFEUR_ID_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkLatitude(latitude) {
    if (latitude === undefined || typeof latitude !== 'number' || isNaN(latitude)) {
        answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_LATITUDE_NOT_DEFINED))
        return false;
    }
    return true;
}

function checkLongitute(longitude) {
    if (longitude === undefined || typeof longitude !== 'number' || isNaN(longitude)) {
        answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_LONGITUDE_NOT_DEFINED))
        return false;
    }
    return true;
}

function checkData(data) {
    if (data === undefined) {
        answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_DATA_NOT_DEFINED))
        return false;
    }
    return true;
}

/**
 * create a module from scratch with all infos
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {string} req.body.golfeur_id
 * @param {string} req.body.latitude
 * @param {string} req.body.longitude
 * @param {Function} next - The next middleware to call
 * @alias module:ConditionMeteoController.create
 */
const create = async function (req, res, next) {

    answer.reset()
    // sanity check on parameters
    if ((!checkGolfeur_id(req.body.golfeur_id)) ||
        (!checkLatitude(req.body.latitude)) ||
        (!checkLongitute(req.body.longitude)))
    {
        return next(answer);
    }

    // check if localisationBall already exists by?
    let localisationBall= null
    try {
        //A FAIRE
    }
    catch(err) {
        answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_INVALID_FIND_LB_REQUEST))
        return next(answer);
    }

    let golfeur = null
    golfeur = await Golfeur.findOne({_id:req.body.golfeur_id}).exec();
    if (golfeur === null) {
        answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_INVALID_FIND_GOLFEUR_REQUEST))
        return next(answer);
    }
    golfeur = golfeur._id;

    let lb = {
        golfeur_id: golfeur,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };

    LocalisationBall.create(lb, async function(err, localisationBall) {
        if (err) {
            answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_CANNOT_CREATE))
            answer.data = answer.data + '\n' + err;
            return next(answer);
        }
        if (localisationBall === null) {
            answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_CANNOT_CREATE))
            return next(answer);
        }
        else {
            answer.data = localisationBall;
            res.status(201).send(answer);
        }
    });
};

/**
 * update a module
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {Object} req.body.id_localisationBall
 * @param {string} req.body.data - The data to update (normally containing all fields)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 * @alias module:MeasureController.update
 */
const update = async function (req, res, next) {
    answer.reset()
    console.log('update localisation ball');
    // sanity check on parameters
    if (!checkData(req.body.data)) {
        return next(answer);
    }

    let localisationBall = null
    // check if module exists
    try {
        localisationBall = await LocalisationBall.findOne({_id:id_localisationBall}).exec();
        if (localisationBall === null) {
            answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_CANNOT_FIND_ID))
            return next(answer);
        }
    }
    catch(err) {
        answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_INVALID_FIND_ID_REQUEST))
        return next(answer);
    }

    try {
        localisationBall.set(req.body.data);
    }
    catch(err) {
        console.log("error while updating whole localisation ball")
        answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_CANNOT_UPDATE))
        return next(answer);
    }

    localisationBall.save(async function (err) {
        if (err) {
            answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_CANNOT_UPDATE))
            return next(answer);
        }
        // sends back the whole module
        answer.data = localisationBall;
        res.status(200).send(answer);
    });
};

/**
 * Supprime une localisation de balle par id
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.id_localisationBall - L'ID de la localisation balle à supprimer
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 */
const deleteLocalisationBalle = async function (req, res, next) {
    answer.reset();

    let localisationBall = null;

    // Vérification de l'existence de la localisation de la balle
    try {
        localisationBall = await LocalisationBall.findOne({ _id: req.body.id_localisationBall }).exec();
        if (localisationBall === null) {
            answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_INVALID_FIND_ES_REQUEST));
        return next(answer);
    }

    // Suppression de la camera de surveillance
    try {
        await LocalisationBall.deleteOne({ _id: req.body.id_localisationBall }).exec();
    } catch (err) {
        answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_CANNOT_DELETE));
        return next(answer);
    }

    // Renvoie la localisation de la balle supprimée
    answer.data = localisationBall;
    res.status(200).send(answer);
}

/**
 * get all localisations balls
 * @param {Object} req - The request object (provided by express)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 */
const getLocalisationsBalle = async function (req, res, next) {
    answer.reset()

    console.log('get localisations balles');
    let localisationsBalls = null
    try {
        localisationsBalls = await LocalisationBall.find({}).exec();
    }
    catch(err) {
        answer.set(LocalisationBallErrors.getError(LocalisationBallErrors.ERR_LB_INVALID_FIND_REQUEST))
        return next(answer);
    }
    answer.data = localisationsBalls;
    res.status(200).send(answer);
};

module.exports = {
    create,
    update,
    deleteLocalisationBalle,
    getLocalisationsBalle,
}