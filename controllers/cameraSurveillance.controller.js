/**
 * defines methods to know about the Meteo on a golf course
 * @module GestionnaireTrouController
 */

const CameraSurveillance = require('../models/cameraSurveillance.model')
const CameraSurveillanceErrors = require('../commons/cameraSurveillance.errors')
const Trou = require('../models/trou.model')
const { v4: uuidv4 } = require('uuid');
const Config = require('../commons/config');
const validator = require('validator');
const {answer} = require('./ControllerAnswer')
const ModuleErrors = require("../commons/module.errors");

function checkTrou_id(trou_id) {
    if (trou_id === undefined) {
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_TROU_ID_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkDate(date) {
    if (date === undefined) {
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_DATE_NOT_DEFINED))
        return false;
    }
    return true;
}

function checkVideoURL(video_url) {
    if (video_url === undefined || typeof video_url !== 'string' || video_url.trim() === '') {
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_VIDEO_URL_NOT_DEFINED));
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
 * @param {string} req.body.trou_id
 * @param {string} req.body.date
 * @param {string} req.body.video_url
 * @param {Function} next - The next middleware to call
 * @alias module:ConditionMeteoController.create
 */
const create = async function (req, res, next) {

    answer.reset()
    // sanity check on parameters
    if ((!checkTrou_id(req.body.trou_id)) ||
        (!checkDate(req.body.date)) ||
        (!checkVideoURL(req.body.video_url)))
    {
        return next(answer);
    }

    // check if cameraSurveillance already exists by?
    let cameraSurveillance= null
    try {
        //A FAIRE
    }
    catch(err) {
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_INVALID_FIND_CS_REQUEST))
        return next(answer);
    }

    let trou = null;
    trou = await Trou.findOne({numero:req.body.trou_id}).exec();
    if (trou === null) {
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_INVALID_FIND_TROU_REQUEST))
        return next(answer);
    }
    trou = trou._id;


    let cs = {
        trou_id: trou,
        date: req.body.date,
        video_url: req.body.video_url
    };
    CameraSurveillance.create(cs, async function(err, cameraSurveillance) {
        if (err) {
            answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_CANNOT_CREATE))
            answer.data = answer.data + '\n' + err;
            return next(answer);
        }
        if (cameraSurveillance === null) {
            answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_CANNOT_CREATE))
            return next(answer);
        }
        else {
            answer.data = cameraSurveillance;
            res.status(201).send(answer);
        }
    });
};

/**
 * update a module
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {Object} req.body.id_cameraSurveillance
 * @param {string} req.body.data - The data to update (normally containing all fields)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 * @alias module:MeasureController.update
 */
const update = async function (req, res, next) {
    answer.reset()
    console.log('update camera surveillance');
    // sanity check on parameters
    if (!checkData(req.body.data)) {
        return next(answer);
    }

    let cameraSurveillance = null
    // check if module exists
    try {
        cameraSurveillance = await CameraSurveillance.findOne({_id:id_cameraSurveillance}).exec();
        if (cameraSurveillance === null) {
            answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_CANNOT_FIND_ID))
            return next(answer);
        }
    }
    catch(err) {
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_INVALID_FIND_ID_REQUEST))
        return next(answer);
    }

    try {
        cameraSurveillance.set(req.body.data);
    }
    catch(err) {
        console.log("error while updating whole camera surveillance")
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_CANNOT_UPDATE))
        return next(answer);
    }

    cameraSurveillance.save(async function (err) {
        if (err) {
            answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_CANNOT_UPDATE))
            return next(answer);
        }
        // sends back the whole module
        answer.data = cameraSurveillance;
        res.status(200).send(answer);
    });
};

/**
 * Supprime une camzra de surveillance par id
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.id_cameraSurveillance - L'ID du gestionnaire Trou à supprimer
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 */
const deleteCameraSurveillance = async function (req, res, next) {
    answer.reset();

    let cameraSurveillance = null;

    // Vérification de l'existence de la camera de surveillance
    try {
        cameraSurveillance = await CameraSurveillance.findOne({ _id: req.body.id_cameraSurveillance }).exec();
        if (cameraSurveillance === null) {
            answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR.CS_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_INVALID_FIND_CS_REQUEST));
        return next(answer);
    }

    // Suppression de la camera de surveillance
    try {
        await CameraSurveillance.deleteOne({ _id: req.body.id_cameraSurveillance }).exec();
    } catch (err) {
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_CANNOT_DELETE));
        return next(answer);
    }

    // Renvoie la camera de surveillance supprimée
    answer.data = cameraSurveillance;
    res.status(200).send(answer);
}

/**
 * get all camera surveillance
 * @param {Object} req - The request object (provided by express)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 */
const getCamerasSurveillance = async function (req, res, next) {
    answer.reset()

    console.log('get cameras surveillance');
    let camerasSurveillance = null
    try {
        camerasSurveillance = await CameraSurveillance.find({}).exec();
    }
    catch(err) {
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_INVALID_FIND_REQUEST))
        return next(answer);
    }
    answer.data = camerasSurveillance;
    res.status(200).send(answer);
};

/**
 * Get a surveillance camera by ID
 * @param {Object} req - The request object (provided by express)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 */
const getCameraSurveillanceById = async function (req, res, next) {
    answer.reset();

    console.log('get camera surveillance by id');

    let cameraSurveillance = null;

    // Retrieve the surveillance camera by ID
    try {
        cameraSurveillance = await CameraSurveillance.findOne({ _id: req.params.id }).exec();
    } catch (err) {
        answer.set(CameraSurveillanceErrors.getError(CameraSurveillanceErrors.ERR_CS_INVALID_FIND_REQUEST));
        return next(answer);
    }

    // Send the surveillance camera
    answer.data = cameraSurveillance;
    res.status(200).send(answer);
};


module.exports = {
    create,
    update,
    deleteCameraSurveillance,
    getCamerasSurveillance,
    getCameraSurveillanceById,
}