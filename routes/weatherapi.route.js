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

router.post('/auth/signin', asyncRoute(authController.signIn));

module.exports = router;
