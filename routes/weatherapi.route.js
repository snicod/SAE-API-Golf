/**
 * assgins routes
 * @module GesapiRoute
 */

const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const moduleController = require('../controllers/module.controller');
const measureController = require('../controllers/measure.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const conditionsMeteoController = require('../controllers/conditionsMeteo.controller');
const drapeauController = require('../controllers/drapeau.controller');
const golfeurController = require('../controllers/golfeur.controller');
const trouController = require('../controllers/trou.controller');
const statistiqueCoupController = require('../controllers/statistiqueCoup.controller');
const cameraSurveillanceController = require('../controllers/cameraSurveillance.controller');
const localisationBalleController = require('../controllers/localisationBalle.controller');
const etatSolController = require('../controllers/etatSol.controller');
const gestionnaireTrousController = require('../controllers/gestionnaireTrous.controller');
const imageDrapeauController = require('../controllers/imageDrapeau.controller');

const asyncRoute = ctrl =>
  (req, res, next) => {
    Promise.resolve(ctrl(req, res, next))
      .catch(next);
  };

router.post('/measure/create', asyncRoute(measureController.create));
router.patch('/measure/update', asyncRoute(measureController.update));
router.get('/measure/get', asyncRoute(measureController.getMeasures));

router.post('/module/register', asyncRoute(moduleController.register));
router.post('/module/create', asyncRoute(moduleController.create));
router.patch('/module/update', asyncRoute(moduleController.update));
router.get('/module/get', asyncRoute(moduleController.getModules));

router.post('/user/create', asyncRoute(userController.create));
router.patch('/user/update', asyncRoute(userController.update));
router.get('/user/getusers', asyncRoute(userController.getUsers));

router.post('/conditionsMeteo/create', asyncRoute(conditionsMeteoController.create));
router.patch('/conditionsMeteo/update', asyncRoute(conditionsMeteoController.update));
router.get('/conditionsMeteo/get', asyncRoute(conditionsMeteoController.getConditionMeteos));
router.get('/conditionsMeteo/delete', asyncRoute(conditionsMeteoController.deleteConditionMeteo));

router.post('/drapeau/create', asyncRoute(drapeauController.create));
router.patch('/drapeau/update', asyncRoute(drapeauController.update));
router.get('/drapeau/get', asyncRoute(drapeauController.getDrapeaux));
router.get('/drapeau/delete', asyncRoute(drapeauController.deleteDrapeau));

router.post('/golfeur/create', asyncRoute(golfeurController.create));
router.patch('/golfeur/update', asyncRoute(golfeurController.update));
router.get('/golfeur/get', asyncRoute(golfeurController.getGolfeurs));
router.get('/golfeur/delete', asyncRoute(golfeurController.deleteGolfeur));

router.post('/trou/create', asyncRoute(trouController.create));
router.patch('/trou/update', asyncRoute(trouController.update));
router.get('/trou/get', asyncRoute(trouController.getTrous));
router.get('/trou/delete', asyncRoute(trouController.deleteTrou));

router.post('/statistiqueCoup/create', asyncRoute(statistiqueCoupController.create));
router.patch('/statistiqueCoup/update', asyncRoute(statistiqueCoupController.update));
router.get('/statistiqueCoup/get', asyncRoute(statistiqueCoupController.getStatistiquesCoups));
router.get('/statistiqueCoup/delete', asyncRoute(statistiqueCoupController.deleteStatistiqueCoup));

router.post('/cameraSurveillance/create', asyncRoute(cameraSurveillanceController.create));
router.patch('/cameraSurveillance/update', asyncRoute(cameraSurveillanceController.update));
router.get('/cameraSurveillance/get', asyncRoute(cameraSurveillanceController.getCamerasSurveillance));
router.get('/cameraSurveillance/delete', asyncRoute(cameraSurveillanceController.deleteCameraSurveillance));

router.post('/localisationBalle/create', asyncRoute(localisationBalleController.create));
router.patch('/localisationBalle/update', asyncRoute(localisationBalleController.update));
router.get('/localisationBalle/get', asyncRoute(localisationBalleController.getLocalisationsBalle));
router.get('/localisationBalle/delete', asyncRoute(localisationBalleController.deleteLocalisationBalle));

router.post('/etatSol/create', asyncRoute(etatSolController.create));
router.patch('/etatSol/update', asyncRoute(etatSolController.update));
router.get('/etatSol/get', asyncRoute(etatSolController.getEtatsSol));
router.get('/etatSol/delete', asyncRoute(etatSolController.deleteEtatSol));

router.post('/gestionnaireTrous/create', asyncRoute(gestionnaireTrousController.create));
router.patch('/gestionnaireTrous/update', asyncRoute(gestionnaireTrousController.update));
router.get('/gestionnaireTrous/get', asyncRoute(gestionnaireTrousController.getGestionnairesTrou));
router.get('/gestionnaireTrous/delete', asyncRoute(gestionnaireTrousController.deleteGestionnaireTrou));

router.post('/imageDrapeau/create', asyncRoute(imageDrapeauController.create));
router.patch('/imageDrapeau/update', asyncRoute(imageDrapeauController.update));
router.get('/imageDrapeau/get', asyncRoute(imageDrapeauController.getImagesDrapeaux));
router.get('/imageDrapeau/delete', asyncRoute(imageDrapeauController.deleteImagesDrapeau));


router.post('/auth/signin', asyncRoute(authController.signIn));

module.exports = router;
