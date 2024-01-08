/**
 * defines methods to know about the Meteo on a golf course
 * @module GestionnaireTrouController
 */

const EtatSol = require('../models/etatSol.model')
const EtatSolErrors = require('../commons/etatSol.errors')
const Trou = require('../models/trou.model')
const { v4: uuidv4 } = require('uuid');
const Config = require('../commons/config');
const validator = require('validator');
const {answer} = require('./ControllerAnswer')
const ModuleErrors = require("../commons/module.errors");

function checkTrou_id(trou_id) {
    if (trou_id === undefined) {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_TROU_ID_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkDate(date) {
    if (date === undefined) {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_DATE_NOT_DEFINED))
        return false;
    }
    return true;
}

function checkDensiteHerbe(densite_herbe) {
    if (densite_herbe === undefined || typeof densite_herbe !== 'string' || densite_herbe.trim() === '') {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_DENSITE_HERBE_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkQualiteNutriments(qualite_nutriments) {
    if (qualite_nutriments === undefined || typeof qualite_nutriments !== 'string' || qualite_nutriments.trim() === '') {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_QUALITE_NUTRIMENTS_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkHumiditeSol(humidite_sol) {
    if (humidite_sol === undefined || typeof humidite_sol !== 'number' || isNaN(humidite_sol)) {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_HUMIDITE_SOL_NOT_DEFINED))
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
 * @param {string} req.body.densite_herbe
 * @param {string} req.body.humidite_sol
 * @param {String} req.body.qualite_nutriments
 * @param {Function} next - The next middleware to call
 * @alias module:ConditionMeteoController.create
 */
const create = async function (req, res, next) {

    answer.reset()
    // sanity check on parameters
    if ((!checkTrou_id(req.body.trou_id)) ||
        (!checkDate(req.body.date)) ||
        (!checkDensiteHerbe(req.body.densite_herbe)) ||
        (!checkQualiteNutriments(req.body.qualite_nutriments)) ||
        (!checkHumiditeSol(req.body.humidite_sol)))
    {
        return next(answer);
    }

    // check if gestionnaireTrou already exists by?
    let etatSol= null
    try {
        //A FAIRE
    }
    catch(err) {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_INVALID_FIND_ES_REQUEST))
        return next(answer);
    }

    let trou = null
    trou = await Trou.findOne({numero:req.body.trou_id}).exec();
    if (trou === null) {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_INVALID_FIND_TROU_REQUEST))
        return next(answer);
    }
    trou = trou._id;

    let es = {
        trou_id: trou,
        date: req.body.date,
        densite_herbe: req.body.densite_herbe,
        qualite_nutriments: req.body.qualite_nutriments,
        humidite_sol: req.body.humidite_sol
    };

    EtatSol.create(es, async function(err, etatSol) {
        if (err) {
            answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_CANNOT_CREATE))
            answer.data = answer.data + '\n' + err;
            return next(answer);
        }
        if (etatSol === null) {
            answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_CANNOT_CREATE))
            return next(answer);
        }
        else {
            answer.data = etatSol;
            res.status(201).send(answer);
        }
    });
};

/**
 * update a module
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {Object} req.body.id_etatSol
 * @param {string} req.body.data - The data to update (normally containing all fields)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 * @alias module:MeasureController.update
 */
const update = async function (req, res, next) {
    answer.reset()
    console.log('update etat sol');
    // sanity check on parameters
    if (!checkData(req.body.data)) {
        return next(answer);
    }

    let etatSol = null
    // check if module exists
    try {
        etatSol = await EtatSol.findOne({_id:id_etatSol}).exec();
        if (etatSol === null) {
            answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_CANNOT_FIND_ID))
            return next(answer);
        }
    }
    catch(err) {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_INVALID_FIND_ID_REQUEST))
        return next(answer);
    }

    try {
        etatSol.set(req.body.data);
    }
    catch(err) {
        console.log("error while updating whole etat sol")
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_CANNOT_UPDATE))
        return next(answer);
    }

    etatSol.save(async function (err) {
        if (err) {
            answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_CANNOT_UPDATE))
            return next(answer);
        }
        // sends back the whole module
        answer.data = etatSol;
        res.status(200).send(answer);
    });
};

/**
 * Supprime un etat sol par ID
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.id_etatSol - L'ID du gestionnaire Trou à supprimer
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 */
const deleteEtatSol = async function (req, res, next) {
    answer.reset();

    let etatSol = null;

    // Vérification de l'existence de l'etat sol
    try {
        etatSol = await EtatSol.findOne({ _id: req.body.id_etatSol }).exec();
        if (etatSol === null) {
            answer.set(EtatSolErrors.getError(EtatSolErrors.ERR.ES_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_INVALID_FIND_ES_REQUEST));
        return next(answer);
    }

    // Suppression de l'etat sol
    try {
        await EtatSol.deleteOne({ _id: req.body.id_etatSol }).exec();
    } catch (err) {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_CANNOT_DELETE));
        return next(answer);
    }

    // Renvoie l'etat sol supprimée
    answer.data = etatSol;
    res.status(200).send(answer);
}

/**
 * get all etatsSol
 * @param {Object} req - The request object (provided by express)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 */
const getEtatsSol = async function (req, res, next) {
    answer.reset()

    console.log('get etats sol');
    let etatsSol = null
    try {
        etatsSol = await EtatSol.find({}).exec();
    }
    catch(err) {
        answer.set(EtatSolErrors.getError(EtatSolErrors.ERR_ES_INVALID_FIND_REQUEST))
        return next(answer);
    }
    answer.data = etatsSol;
    res.status(200).send(answer);
};

module.exports = {
    create,
    update,
    deleteEtatSol,
    getEtatsSol,
}