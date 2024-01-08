const ImagesDrapeaux = require('../models/imageDrapeau.model');
const ImagesDrapeauxErrors = require('../commons/imageDrapeau.errors');
const { answer } = require('./ControllerAnswer');


function checkDistanceEstimee(distance_estimee) {
    if (distance_estimee === undefined || typeof distance_estimee !== 'number' || isNaN(distance_estimee)) {
        answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_DISTANCE_NOT_VALID));
        return false;
    }
    return true;
}

/**
 * Crée une nouvelle image de drapeau
 * @param req
 * @param res
 * @param next
 */
const create = async function (req, res, next) {
    answer.reset();

    // Vérification de la validité des paramètres
    if (!checkDistanceEstimee(req.body.distance_estimee)) {
        return next(answer);
    }

    const imagesDrapeauxData = {
        distance_estimee: req.body.distance_estimee,
    };

    // Création de l'image de drapeau
    ImagesDrapeaux.create(imagesDrapeauxData, async function (err, imagesDrapeau) {
        if (err) {
            answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_CANNOT_CREATE));
            answer.data = answer.data + '\n' + err;
            return next(answer);
        }

        if (imagesDrapeau === null) {
            answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_CANNOT_CREATE));
            return next(answer);
        } else {
            // Renvoie toutes les données de l'image de drapeau
            answer.data = imagesDrapeau;
            res.status(201).send(answer);
        }
    });
};
/**
 * Met à jour une image de drapeau existante
 * @param req
 * @param res
 * @param next
 */
const update = async function (req, res, next) {
    answer.reset();

    // Vérification de la validité des données
    if (!checkData(req.body.data)) {
        return next(answer);
    }

    let imagesDrapeau = null;

    // Vérification de l'existence de l'image de drapeau
    try {
        imagesDrapeau = await ImagesDrapeaux.findOne({ _id: req.body.idImagesDrapeau }).exec();
        if (imagesDrapeau === null) {
            answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_INVALID_FIND_ID_REQUEST));
        return next(answer);
    }

    // Mise à jour des données de l'image de drapeau
    try {
        imagesDrapeau.set(req.body.data);
    } catch (err) {
        console.log('Erreur lors de la mise à jour de l\'image de drapeau');
        answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_CANNOT_UPDATE));
        return next(answer);
    }

    // Sauvegarde des modifications
    imagesDrapeau.save(async function (err) {
        if (err) {
            answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_CANNOT_UPDATE));
            return next(answer);
        }

        // Renvoie toutes les données de l'image de drapeau
        answer.data = imagesDrapeau;
        res.status(200).send(answer);
    });
};

/**
 * Récupère toutes les images de drapeau
 * @param req
 * @param res
 * @param next
 */
const getImagesDrapeaux = async function (req, res, next) {
    answer.reset();

    let imagesDrapeaux = null;

    // Récupération de toutes les images de drapeau
    try {
        imagesDrapeaux = await ImagesDrapeaux.find({}).exec();
    } catch (err) {
        answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_INVALID_FIND_REQUEST));
        return next(answer);
    }

    // Renvoie toutes les images de drapeau
    answer.data = imagesDrapeaux;
    res.status(200).send(answer);
};
/**
 * Supprime une image de drapeau par ID
 * @param req
 * @param res
 * @param next
 */
const deleteImagesDrapeau = async function (req, res, next) {
    answer.reset();

    let imagesDrapeau = null;

    // Vérification de l'existence de l'image de drapeau
    try {
        imagesDrapeau = await ImagesDrapeaux.findOne({ _id: req.body.idImagesDrapeau }).exec();
        if (imagesDrapeau === null) {
            answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_CANNOT_FIND_ID));
            return next(answer);
        }
    } catch (err) {
        answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_INVALID_FIND_ID_REQUEST));
        return next(answer);
    }

    // Suppression de l'image de drapeau
    try {
        await ImagesDrapeaux.deleteOne({ _id: req.body.idImagesDrapeau }).exec();
    } catch (err) {
        answer.set(ImagesDrapeauxErrors.getError(ImagesDrapeauxErrors.ERR_IMAGESDRAPEAUX_CANNOT_DELETE));
        return next(answer);
    }

    // Renvoie toutes les données de l'image de drapeau
    answer.data = imagesDrapeau;
    res.status(200).send(answer);
};

module.exports = {
    create,
    update,
    getImagesDrapeaux,
    deleteImagesDrapeau,
};
