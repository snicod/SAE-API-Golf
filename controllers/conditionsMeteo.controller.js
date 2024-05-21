/**
 * defines methods to know about the Meteo on a golf course
 * @module ConditionMeteoController
 */

const ConditionMeteo = require('../models/conditionMeteo.model')
const ConditionMeteoErrors = require('../commons/conditionMeteo.errors')
const Trou = require('../models/trou.model')
const { v4: uuidv4 } = require('uuid');
const Config = require('../commons/config');
const validator = require('validator');
const {answer} = require('./ControllerAnswer')
const ModuleErrors = require("../commons/module.errors");



function checkTrou_id(trou_id) {
    if (trou_id === undefined) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_TROU_ID_NOT_DEFINED))
        return false;
    }
    return true;
}

function checkDate(date) {
    if (date === undefined) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_DATE_NOT_DEFINED))
        return false;
    }
    return true;
}

function checkTemperature(temperature) {
    if (temperature === undefined || typeof temperature !== 'number' || isNaN(temperature)) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_TEMPERATURE_NOT_DEFINED))
        return false;
    }
    return true;
}

function checkHumidite(humidite) {
    if (humidite === undefined || typeof humidite !== 'number' || isNaN(humidite)) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_HUMIDITE_NOT_DEFINED))
        return false;
    }
    return true;
}

function checkVent(vent) {
    // Vérifie si l'attribut 'vent' est défini et est un objet
    if (vent === undefined || typeof vent !== 'object' || vent === null) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_VENT_NOT_DEFINED));
        return false;
    }

    // Vérifie si l'attribut 'vitesse' est défini et est un nombre
    if (vent.vitesse === undefined || typeof vent.vitesse !== 'number' || isNaN(vent.vitesse)) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_VENT_VITESSE_NOT_DEFINED));
        return false;
    }

    // Vérifie si l'attribut 'direction' est défini et est une chaîne de caractères
    if (vent.direction === undefined || typeof vent.direction !== 'string' || vent.direction.trim() === '') {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_VENT_DIRECTION_NOT_DEFINED));
        return false;
    }


    // Toutes les vérifications ont réussi, retourne true
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
 * register a conditio because of it asks for => its name/shortname/key are generated
 */
const register = async function (req, res, next) {
    // A faire - ou pas vu qu'on enregistre pas "a moitié"
};

/**
 * create a module from scratch with all infos
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {string} req.body.trou_id
 * @param {string} req.body.date
 * @param {string} req.body.temperature
 * @param {string} req.body.humidite
 * @param {Array} req.body.vent
 * @param {Function} next - The next middleware to call
 * @alias module:ConditionMeteoController.create
 */
const create = async function (req, res, next) {

    answer.reset()
    // sanity check on parameters
    if ((!checkTrou_id(req.body.trou_id)) ||
        (!checkDate(req.body.date)) ||
        (!checkTemperature(req.body.temperature)) ||
        (!checkHumidite(req.body.humidite)) ||
        (!checkVent(req.body.vent))) {
        return next(answer);
    }

    // check if conditionMeteo already exists by?
    let conditionMeteo = null
    try {
        //A FAIRE
    }
    catch(err) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_INVALID_FIND_CM_REQUEST))
        return next(answer);
    }

    // now try to find trou from what is provided in req.body.trou_id
    let trou = null
    trou = await Trou.findOne({numero:req.body.trou_id}).exec();
    trou = trou._id;
    if (trou === null) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_INVALID_FIND_TROU_REQUEST))
        return next(answer);
    }

    let cm = {
        trou_id: trou,
        date: req.body.date,
        temperature: req.body.temperature,
        humidite: req.body.humidite,
        vent: req.body.vent
    };

    ConditionMeteo.create(cm, async function(err, conditionMeteo) {
        if (err) {
            answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_CANNOT_CREATE))
            answer.data = answer.data + '\n' + err;
            return next(answer);
        }
        if (conditionMeteo === null) {
            answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_CANNOT_CREATE))
            return next(answer);
        }
        else {
            // sends back the whole teacher
            answer.data = conditionMeteo;
            res.status(201).send(answer);
        }
    });
};

/**
 * update a module
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {Object} req.body.idConditionMeteo
 * @param {string} req.body.data - The data to update (normally containing all fields)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 * @alias module:MeasureController.update
 */
const update = async function (req, res, next) {
    answer.reset()
    console.log('update condition meteo');
    // sanity check on parameters
    if (!checkData(req.body.data)) {
        return next(answer);
    }

    let conditionMeteo = null
    // check if module exists
    try {
        conditionMeteo = await ConditionMeteo.findOne({_id:req.body.idConditionMeteo}).exec();
        if (conditionMeteo === null) {
            answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_CANNOT_FIND_ID))
            return next(answer);
        }
    }
    catch(err) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_INVALID_FIND_ID_REQUEST))
        return next(answer);
    }

    try {
        conditionMeteo.set(req.body.data);
    }
    catch(err) {
        console.log("error while updating whole condition meteo")
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_CANNOT_UPDATE))
        return next(answer);
    }

    conditionMeteo.save(async function (err) {
        if (err) {
            answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_CANNOT_UPDATE))
            return next(answer);
        }
        // sends back the whole module
        answer.data = conditionMeteo;
        res.status(200).send(answer);
    });
};

/**
 * get all conditionMeteo
 * @param {Object} req - The request object (provided by express)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 */
const getConditionMeteos = async function (req, res, next) {
    answer.reset()

    console.log('get condition meteos');
    let conditionMeteos = null
    try {
        conditionMeteos = await ConditionMeteo.find({}).exec();
    }
    catch(err) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_INVALID_FIND_REQUEST))
        return next(answer);
    }
    // sends back all conditionMeteos
    answer.data = conditionMeteos;
    res.status(200).send(answer);
};
/**
 * Supprime une condition météo par ID
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.idConditionMeteo - L'ID de la condition météo à supprimer
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 * @alias module:ConditionsMeteoController.deleteConditionMeteo
 */
const deleteConditionMeteo = async function (req, res, next) {
    answer.reset();

    let conditionMeteo = null;

    // Vérification de l'existence de la condition météo
    try {
        conditionMeteo = await ConditionsMeteo.findOne({ _id: req.body.idConditionMeteo }).exec();
        if (conditionMeteo === null) {
            answer.set(ConditionsMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(ConditionsMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_INVALID_FIND_CM_REQUEST));
        return next(answer);
    }

    // Suppression de la condition météo
    try {
        await ConditionsMeteo.deleteOne({ _id: req.body.idConditionMeteo }).exec();
    } catch (err) {
        answer.set(ConditionsMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_CANNOT_DELETE));
        return next(answer);
    }

    // Renvoie la condition météo supprimée
    answer.data = conditionMeteo;
    res.status(200).send(answer);
}

/**
 * Get a weather condition by ID
 * @param {Object} req - The request object (provided by express)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 */
const getConditionMeteoById = async function (req, res, next) {
    answer.reset();

    let conditionMeteo = null;

    // Retrieve the weather condition by ID
    try {
        conditionMeteo = await ConditionMeteo.findOne({ _id: req.params.id }).exec();
    } catch (err) {
        answer.set(ConditionMeteoErrors.getError(ConditionMeteoErrors.ERR_CM_INVALID_FIND_REQUEST));
        return next(answer);
    }

    // Send the weather condition
    answer.data = conditionMeteo;
    res.status(200).send(answer);
};


module.exports = {
    create,
    update,
    register,
    deleteConditionMeteo,
    getConditionMeteos,
    getConditionMeteoById,
}