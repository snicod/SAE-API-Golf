/**
 * defines methods to know about the Meteo on a golf course
 * @module GestionnaireTrouController
 */

const GestionnaireTrou = require('../models/gestionnaireTrous.model')
const GestionnaireTrouError = require('../commons/gestionnaireTrous.errors')
const { v4: uuidv4 } = require('uuid');
const Config = require('../commons/config');
const validator = require('validator');
const {answer} = require('./ControllerAnswer')
const ModuleErrors = require("../commons/module.errors");

function checkNom(nom) {
    if (nom === undefined || typeof nom !== 'string' || nom.trim() === '') {
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_NAME_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkPrenom(prenom) {
    if (prenom === undefined || typeof prenom !== 'string' || prenom.trim() === '') {
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_PRENOM_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkEmail(email) {
    if (email === undefined || typeof email !== 'string' || email.trim() === '') {
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_EMAIL_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkMDP(mot_de_passe) {
    if (mot_de_passe === undefined || typeof mot_de_passe !== 'string' || mot_de_passe.trim() === '') {
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_MDP_NOT_DEFINED));
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
 * register a condition because of it asks for => its name/shortname/key are generated
 */
const register = async function (req, res, next) {
    // A faire - ou pas vu qu'on enregistre pas "a moitié"
};

/**
 * create a module from scratch with all infos
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {string} req.body.nom
 * @param {string} req.body.prenom
 * @param {string} req.body.email
 * @param {String} req.body.mot_de_passe
 * @param {Function} next - The next middleware to call
 * @alias module:ConditionMeteoController.create
 */
const create = async function (req, res, next) {

    answer.reset()
    // sanity check on parameters
    if ((!checkNom(req.body.nom)) ||
        (!checkPrenom(req.body.prenom)) ||
        (!checkEmail(req.body.email)) ||
        (!checkMDP(req.body.mot_de_passe))) {
        return next(answer);
    }

    // check if gestionnaireTrou already exists by?
    let gestionnaireTrou= null
    try {
        //A FAIRE
    }
    catch(err) {
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_INVALID_FIND_GT_REQUEST))
        return next(answer);
    }

    let gt = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        mot_de_passe: req.body.mot_de_passe
    };

    GestionnaireTrou.create(gt, async function(err, gestionnaireTrou) {
        if (err) {
            answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_CANNOT_CREATE))
            answer.data = answer.data + '\n' + err;
            return next(answer);
        }
        if (gestionnaireTrou === null) {
            answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_CANNOT_CREATE))
            return next(answer);
        }
        else {
            answer.data = gestionnaireTrou;
            res.status(201).send(answer);
        }
    });
};

/**
 * update a module
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {Object} req.body.id_GestionnaireTrou
 * @param {string} req.body.data - The data to update (normally containing all fields)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 * @alias module:MeasureController.update
 */
const update = async function (req, res, next) {
    answer.reset()
    console.log('update gestionnaireTrou');
    // sanity check on parameters
    if (!checkData(req.body.data)) {
        return next(answer);
    }

    let gestionnaireTrou = null
    // check if module exists
    try {
        gestionnaireTrou = await GestionnaireTrou.findOne({_id:req.body.id_GestionnaireTrou}).exec();
        if (gestionnaireTrou === null) {
            answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_CANNOT_FIND_ID))
            return next(answer);
        }
    }
    catch(err) {
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_INVALID_FIND_ID_REQUEST))
        return next(answer);
    }

    try {
        gestionnaireTrou.set(req.body.data);
    }
    catch(err) {
        console.log("error while updating whole gestionnaire trou")
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_CANNOT_UPDATE))
        return next(answer);
    }

    gestionnaireTrou.save(async function (err) {
        if (err) {
            answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_CANNOT_UPDATE))
            return next(answer);
        }
        // sends back the whole module
        answer.data = gestionnaireTrou;
        res.status(200).send(answer);
    });
};

/**
 * Supprime un gestionnaire trou par ID
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.id_GestionnaireTrou - L'ID du gestionnaire Trou à supprimer
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 */
const deleteGestionnaireTrou = async function (req, res, next) {
    answer.reset();

    let gestionnaireTrou = null;

    // Vérification de l'existence du gestionnaire trou
    try {
        gestionnaireTrou = await GestionnaireTrou.findOne({ _id: req.body.id_GestionnaireTrou }).exec();
        if (gestionnaireTrou === null) {
            answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_INVALID_FIND_GT_REQUEST));
        return next(answer);
    }

    // Suppression du gestionnaire trou
    try {
        await GestionnaireTrou.deleteOne({ _id: req.body.id_GestionnaireTrou }).exec();
    } catch (err) {
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_CANNOT_DELETE));
        return next(answer);
    }

    // Renvoie le gestionnaire trou supprimée
    answer.data = gestionnaireTrou;
    res.status(200).send(answer);
}

/**
 * get all gestionnaires trou
 * @param {Object} req - The request object (provided by express)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 */
const getGestionnairesTrou = async function (req, res, next) {
    answer.reset()

    console.log('get gestionnaires trous');
    let gestionnairesTrou = null
    try {
        gestionnairesTrou = await GestionnaireTrou.find({}).exec();
    }
    catch(err) {
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_INVALID_FIND_REQUEST))
        return next(answer);
    }
    // sends back all gestionnairesTrou
    answer.data = gestionnairesTrou;
    res.status(200).send(answer);
};

/**
 * Get a hole manager by ID
 * @param {Object} req - The request object (provided by express)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 */
const getGestionnaireTrouById = async function (req, res, next) {
    answer.reset();

    let gestionnaireTrou = null;

    // Retrieve the hole manager by ID
    try {
        gestionnaireTrou = await GestionnaireTrou.findOne({ _id: req.params.id }).exec();
    } catch (err) {
        answer.set(GestionnaireTrouError.getError(GestionnaireTrouError.ERR_GT_INVALID_FIND_REQUEST));
        return next(answer);
    }

    // Send the hole manager
    answer.data = gestionnaireTrou;
    res.status(200).send(answer);
};


module.exports = {
    create,
    update,
    register,
    deleteGestionnaireTrou,
    getGestionnairesTrou,
    getGestionnaireTrouById,
}