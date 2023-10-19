/**
 * defines methods to interact with Measure documents
 * @module MeasureController
 */

const Module = require('../models/module.model')
const ModuleErrors = require('../commons/module.errors')
const Chipset = require('../models/chipset.model')
const { v4: uuidv4 } = require('uuid');

const Config = require('../commons/config');

const validator = require('validator');

const {answer} = require('./ControllerAnswer')


/* ************************************************
   functions to test parameters taken from req.body
   WARNING: some tests (on string length, values, ...)
   are already done at the mongodb level
 *********************************************** */
function checkName(type) {
  if ((type === undefined) || (!validator.isAlphanumeric(type,'fr-FR',{ignore:' -_'})) ) {
    answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_NAME_NOT_DEFINED))
    return false;
  }
  return true;
}

function checkUC(uc) {
  if ((uc === undefined) || (!validator.isAlphanumeric(uc,'fr-FR',{ignore:' -_'})) ) {
    answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_UC_NOT_DEFINED))
    return false;
  }
  return true;
}

function checkChipsets(chipsets) {
  if ((chipsets === undefined) || (!Array.isArray(chipsets))) {
    answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_CHIPSETS_NOT_DEFINED))
    return false;
  }
  return true;
}

function checkKey(key) {
  if (key === undefined) {
    answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_KEY_NOT_DEFINED))
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
 * register a module because of it asks for => its name/shortname/key are generated
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {string} req.body.uc
 * @param {Array} req.body.chipsets
 * @param {Function} next - The next middleware to call
 */
const register = async function (req, res, next) {

  answer.reset()
  // sanity check on parameters
  if ((!checkUC(req.body.uc)) ||
      (!checkChipsets(req.body.chipsets))) {
    return next(answer);
  }


  let nb = await Module.estimatedDocumentCount();
  nb++;
  let name = ''
  // check if 'module nb' exists or not
  let stop = false
  while(!stop) {
    name = "module "+nb;
    module = await Module.findOne({name: name}).exec()
    if (module === null) {
      stop = true
    }
    else {
      nb++
    }
  }
  let shortName = "mod"+nb;
  // generate a unique key
  let key = uuidv4()
  stop = false
  while (!stop) {
    module = await Module.findOne({key: key}).exec();
    if (module === null) {
      stop = true
    }
    else {
      key = uuidv4()
    }
  }

  // now try to find chipsets _id from their names provided in req.body.chipsets
  let chips = []
  for(let i=0;i<req.body.chipsets.length;i++) {
    let chip = req.body.chipsets[i]
    let c = await Chipset.findOne({name: chip}).exec()
    if (c !== null) {
      chips.push(c._id)
    }
  }

  let m = {
    name: name,
    shortName: shortName,
    key : key,
    uc: req.body.uc,
    chipsets: chips,
  };
  console.log(m)

  Module.create(m, async function(err, module) {
    if (err) {
      answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_INVALID_CREATE_REQUEST))
      answer.data = answer.data + '\n' + err;
      return next(answer);
    }
    if (module === null) {
      answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_CANNOT_CREATE))
      return next(answer);
    }
    else {
      // sends back the whole teacher
      answer.data = module;
      res.status(201).send(answer);
    }
  });
};

/**
 * create a module from scratch with all infos
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {string} req.body.name
 * @param {string} req.body.shortName
 * @param {string} req.body.key
 * @param {string} req.body.uc
 * @param {Array} req.body.chipsets
 * @param {Function} next - The next middleware to call
 * @alias module:MeasureController.create
 */
const create = async function (req, res, next) {

  answer.reset()
  // sanity check on parameters
  if ((!checkName(req.body.name)) ||
      (!checkKey(req.body.key)) ||
      (!checkUC(req.body.uc)) ||
      (!checkChipsets(req.body.chipsets))) {
    return next(answer);
  }

  // check if module name/shortname/key already exists
  let module = null
  try {
    module = await Module.findOne({name:req.body.name}).exec();
    if (module !== null) {
      answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_NAME_ALREADY_EXISTS))
      return next(answer);
    }
    module = await Module.findOne({key:req.body.key}).exec();
    if (module !== null) {
      answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_KEY_ALREADY_EXISTS))
      return next(answer);
    }
    if (req.body.shortName) {
      module = await Module.findOne({shortName:req.body.shortName}).exec();
      if (module !== null) {
        answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_SHORTNAME_ALREADY_EXISTS))
        return next(answer);
      }
    }
  }
  catch(err) {
    answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_INVALID_FIND_MODULE_REQUEST))
    return next(answer);
  }
  // now try to find chipsets _id from their names provided in req.body.chipsets
  let chips = []
  for(let i=0;i<req.body.chipsets.length;i++) {
    let chip = req.body.chipsets[i]
    let c = await Chipset.findOne({name: chip}).exec()
    if (c !== null) {
      chips.push(c._id)
    }
  }

  let m = {
    name: req.body.name,
    shortName: req.body.shortName,
    key : req.body.key,
    uc: req.body.uc,
    chipsets: chips,
  };

  Module.create(m, async function(err, module) {
    if (err) {
      answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_INVALID_CREATE_REQUEST))
      answer.data = answer.data + '\n' + err;
      return next(answer);
    }
    if (module === null) {
      answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_CANNOT_CREATE))
      return next(answer);
    }
    else {
      // sends back the whole teacher
      answer.data = module;
      res.status(201).send(answer);
    }
  });
};

/**
 * update a module
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {Object} req.body.idModule
 * @param {string} req.body.data - The data to update (normally containing all fields)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 * @alias module:MeasureController.update
 */
const update = async function (req, res, next) {
  answer.reset()
  console.log('update module');
  // sanity check on parameters
  if (!checkData(req.body.data)) {
    return next(answer);
  }

  let module = null
  // check if module exists
  try {
    module = await Module.findOne({_id:idModule}).exec();
    if (module === null) {
      answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_CANNOT_FIND_ID))
      return next(answer);
    }
  }
  catch(err) {
    answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_INVALID_FIND_ID_REQUEST))
    return next(answer);
  }

  try {
    module.set(req.body.data);
  }
  catch(err) {
    console.log("error while updating whole module");
    answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_CANNOT_UPDATE))
    return next(answer);
  }

  module.save(async function (err) {
    if (err) {
      answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_CANNOT_UPDATE))
      return next(answer);
    }
    // sends back the whole module
    answer.data = module;
    res.status(200).send(answer);
  });
};

/**
 * get all modules
 * @param {Object} req - The request object (provided by express)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 */
const getModules = async function (req, res, next) {
  answer.reset()

  console.log('get modules');
  let modules = null
  try {
    modules = await Module.find({}).exec();
  }
  catch(err) {
    answer.set(ModuleErrors.getError(ModuleErrors.ERR_MODULE_INVALID_FIND_REQUEST))
    return next(answer);
  }
  // sends back all modules
  answer.data = modules;
  res.status(200).send(answer);
};


module.exports = {
  create,
  update,
  register,
  getModules,
}
