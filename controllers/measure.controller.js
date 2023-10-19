/**
 * defines methods to interact with Measure documents
 * @module MeasureController
 */

const Measure = require('../models/measure.model')
const Module = require('../models/module.model')
const MeasureErrors = require('../commons/measure.errors')
const ModuleErrors = require('../commons/module.errors')

const Config = require('../commons/config');

const validator = require('validator');

const {answer} = require('./ControllerAnswer')


/* ************************************************
   functions to test parameters taken from req.body
   WARNING: some tests (on string length, values, ...)
   are already done at the mongodb level
 *********************************************** */
function checkType(type) {
  if ((type === undefined) || (!validator.isAlphanumeric(type,'fr-FR',{ignore:'-_'})) ) {
    answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_TYPE_NOT_DEFINED))
    return false;
  }
  return true;
}

function checkDate(date) {
  if (date === undefined) {
    answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_DATE_NOT_DEFINED))
    return false;
  }
  return true;
}

function checkValue(value) {
  if ((value === undefined) || (!validator.isAlphanumeric(value,'fr-FR',{ignore:'.-_'})) ) {
    answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_VALUE_NOT_DEFINED))
    return false;
  }
  return true;
}

function checkModuleKey(key) {
  if (key === undefined) {
    answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_MODULE_NOT_DEFINED))
    return false;
  }
  return true;
}

function checkData(data) {
  if (data === undefined) {
    answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_DATA_NOT_DEFINED))
    return false;
  }
  return true;
}


/**
 * create a measure
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {string} req.body.type - The type of measure
 * @param {Date} req.body.date - The timestamp
 * @param {string} req.body.value - The value measured
 * @param {Object} [req.body.moduleKey] - The id of the module that measured
 * @param {Function} next - The next middleware to call
 * @alias module:MeasureController.create
 */
const create = async function (req, res, next) {

  answer.reset()
  // sanity check on parameters
  if ((!checkType(req.body.type)) ||
    (!checkDate(req.body.date)) ||
    (!checkValue(req.body.value))) {
    return next(answer);
  }

  let m = {
    type: req.body.type,
    date: req.body.date,
    value : req.body.value,
  };
  // if module key is given, check if module id exists
  if (req.body.moduleKey) {
    let module = null
    try {
      module = await Module.findOne({key: req.body.moduleKey}).exec();
      if (module === null) {
        answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_INVALID_MODULE_KEY))
        return next(answer);
      }
    } catch (err) {
      answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_INVALID_FIND_MODULE_REQUEST))
      return next(answer);
    }
    m.module = module._id
  }

  Measure.create(m, async function(err, measure) {
    if (err) {
      answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_INVALID_CREATE_REQUEST))
      answer.data = answer.data + '\n' + err;
      return next(answer);
    }
    if (measure === null) {
      answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_CANNOT_CREATE))
      return next(answer);
    }
    else {
      // sends back the whole teacher
      answer.data = measure;
      res.status(201).send(answer);
    }
  });
};

/**
 * update a measure
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {Object} req.body.idMeasure - The _id of the project document for which we create a root element
 * @param {string} req.body.data - The data to update (normally containing all fields)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 * @alias module:MeasureController.update
 */
const update = async function (req, res, next) {
  answer.reset()
  console.log('update measure');
  // sanity check on parameters
  if (!checkData(req.body.data)) {
    return next(answer);
  }

  let measure = null
  // check if measure exists
  try {
    measure = await Measure.findOne({_id:idMeasure}).exec();
    if (measure === null) {
      answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_CANNOT_FIND_ID))
      return next(answer);
    }
  }
  catch(err) {
    answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_INVALID_FIND_ID_REQUEST))
    return next(answer);
  }
  
  try {
    measure.set(req.body.data);
  }
  catch(err) {
    console.log("error while updating whole measure");
    answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_CANNOT_UPDATE))
    return next(answer);
  }

  measure.save(async function (err) {
    if (err) {
      answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_CANNOT_UPDATE))
      return next(answer);
    }
    // sends back the whole measure
    answer.data = measure;
    res.status(200).send(answer);
  });
};

/**
 * get all measures from a module
 * @param {Object} req - The request object (provided by express)
 * @param {Object} [res.query] - the query parameters
 * @param {String} [req.query.key] - The key of the module
 * @param {String} [req.query.type] - The type of measure
 * @param {String} [req.query.after] - The minimal date
 * @param {String} [req.query.until] - The maximal date
 * @param {Function} next - The next middleware to call after this one
 */
const getMeasures = async function (req, res, next) {
  answer.reset()

  let filter = {}
  let module = null

  // if key is provided
  if (req.query.key) {
    // check if module key exists
    let module = null
    try {
      module = await Module.findOne({key:req.query.key}).exec();
      if (module === null) {
        answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_INVALID_MODULE_KEY))
        return next(answer);
      }
      filter.module = module._id
    }
    catch(err) {
      answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_INVALID_FIND_MODULE_REQUEST))
      return next(answer);
    }
  }
  if (req.query.type) {
    filter.type = req.query.type
  }
  let date = {}
  if (req.query.after) {
    date.$gte = req.query.after
  }
  if (req.query.until) {
    date.$lte = req.query.until
  }
  if (date.$gte || date.$lte) {
    filter.date = date
  }

  console.log('get measures');
  let measures = null
  try {
    measures = await Measure.find(filter).exec();
  }
  catch(err) {
    answer.set(MeasureErrors.getError(MeasureErrors.ERR_MEASURE_INVALID_FIND_REQUEST))
    return next(answer);
  }
  // sends back all measures
  answer.data = measures;
  res.status(200).send(answer);
};


module.exports = {
  create,
  update,
  getMeasures,
}
