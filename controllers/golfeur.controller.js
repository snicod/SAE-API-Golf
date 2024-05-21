const Golfeur = require('../models/golfeur.model');
const GolfeurErrors = require('../commons/golfeur.errors');
const { answer } = require('./ControllerAnswer');
const ModuleErrors = require('../commons/module.errors');

function checkNom(nom) {
    if (nom === undefined || typeof nom !== 'string' || nom.trim() === '') {
        answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_NOM_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkPrenom(prenom) {
    if (prenom === undefined || typeof prenom !== 'string' || prenom.trim() === '') {
        answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_PRENOM_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkEmail(email) {
    if (email === undefined || typeof email !== 'string' || email.trim() === '') {
        answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_EMAIL_NOT_DEFINED));
        return false;
    }
    return true;
}

function checkMotDePasse(motDePasse) {
    // Vérifie si l'attribut 'mot_de_passe' est défini et est une chaîne de caractères
    if (motDePasse === undefined || typeof motDePasse !== 'string' || motDePasse.trim() === '') {
        answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_MOT_DE_PASSE_NOT_DEFINED));
        return false;
    }

    return true;
}

/**
 * Crée un nouveau golfeur
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {string} req.body.nom - Le nom du golfeur
 * @param {string} req.body.prenom - Le prénom du golfeur
 * @param {string} req.body.email - L'email du golfeur
 * @param {string} req.body.mot_de_passe - Le mot de passe du golfeur
 * @param {Function} next - La prochaine middleware à appeler
 * @alias module:GolfeurController.create
 */
const create = async function (req, res, next) {
    answer.reset();

    // Vérification de la validité des paramètres
    if (
        !checkNom(req.body.nom) ||
        !checkPrenom(req.body.prenom) ||
        !checkEmail(req.body.email) ||
        !checkMotDePasse(req.body.mot_de_passe)
    ) {
        return next(answer);
    }

    const golfeurData = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        mot_de_passe: req.body.mot_de_passe,
    };

    // Création du golfeur
    Golfeur.create(golfeurData, async function (err, golfeur) {
        if (err) {
            answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_CANNOT_CREATE));
            answer.data = answer.data + '\n' + err;
            return next(answer);
        }

        if (golfeur === null) {
            answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_CANNOT_CREATE));
            return next(answer);
        } else {
            // Renvoie toutes les données du golfeur
            answer.data = golfeur;
            res.status(201).send(answer);
        }
    });
};

/**
 * Met à jour un golfeur existant
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.idGolfeur - L'ID du golfeur à mettre à jour
 * @param {Object} req.body.data - Les données à mettre à jour (normalement toutes les propriétés)
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 * @alias module:GolfeurController.update
 */
const update = async function (req, res, next) {
    answer.reset();

    console.log(req.body.data);


    // Vérification de la validité des données
    /*
    if (!checkData(req.body.data)) {
        return next(answer);
    }
     */

    console.log("TESTTT");

    let golfeur = null;

    // Vérification de l'existence du golfeur
    try {
        golfeur = await Golfeur.findOne({ _id: req.body.idGolfeur }).exec();
        if (golfeur === null) {
            answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_INVALID_FIND_ID_REQUEST));
        return next(answer);
    }

    // Mise à jour des données du golfeur
    try {
        golfeur.set(req.body.data);
    } catch (err) {
        console.log('Erreur lors de la mise à jour du golfeur');
        answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_CANNOT_UPDATE));
        return next(answer);
    }

    // Sauvegarde des modifications
    golfeur.save(async function (err) {
        if (err) {
            answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_CANNOT_UPDATE));
            return next(answer);
        }

        // Renvoie toutes les données du golfeur
        answer.data = golfeur;
        res.status(200).send(answer);
    });
};

/**
 * Récupère tous les golfeurs
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 */
const getGolfeurs = async function (req, res, next) {
    answer.reset();

    let golfeurs = null;

    // Récupération de tous les golfeurs
    try {
        golfeurs = await Golfeur.find({}).exec();
    } catch (err) {
        answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_INVALID_FIND_REQUEST));
        return next(answer);
    }

    // Renvoie tous les golfeurs
    answer.data = golfeurs;
    res.status(200).send(answer);
};

/**
 * Supprime un golfeur par ID
 * @param {Object} req - L'objet de requête (fourni par express)
 * @param {Object} req.body - Les données envoyées avec la requête
 * @param {Object} req.body.idGolfeur - L'ID du golfeur à supprimer
 * @param {Object} res - L'objet résultat utilisé pour renvoyer le résultat au client (fourni par express)
 * @param {Function} next - La prochaine middleware à appeler après celle-ci
 * @alias module:GolfeurController.deleteGolfeur
 */
const deleteGolfeur = async function (req, res, next) {
    answer.reset();

    let golfeur = null;

    // Vérification de l'existence du golfeur
    try {
        golfeur = await Golfeur.findOne({ _id: req.body.idGolfeur }).exec();
        if (golfeur === null) {
            answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_INVALID_FIND_ID_REQUEST));
        return next(answer);
    }

    // Suppression du golfeur
    try {
        await Golfeur.deleteOne({ _id: req.body.idGolfeur }).exec();
    } catch (err) {
        answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_CANNOT_DELETE));
        return next(answer);
    }

    // Renvoie toutes les statistiques de coup
    answer.data = golfeur;
    res.status(200).send(answer);
}

const getGolfeurById = async function (req, res, next) {
    answer.reset();

    let golfeur = null;
    console.log(req.params.id)

    // Récupération du golfeur par ID
    try {
        golfeur = await Golfeur.findOne({ _id: req.params.id }).exec();
    } catch (err) {
        answer.set(GolfeurErrors.getError(GolfeurErrors.ERR_GOLFEUR_INVALID_FIND_REQUEST));
        return next(answer);
    }

    // Renvoie le golfeur
    answer.data = golfeur;
    res.status(200).send(answer);
}



module.exports = {
    create,
    update,
    getGolfeurs,
    deleteGolfeur,
    getGolfeurById
};
