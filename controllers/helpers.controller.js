/**
 * defines common methods to interact with documents
 * @module HelpersController
 */

const User = require('../models/user.model');
const UserErrors  = require('../commons/user.errors');

const {answer} = require('./ControllerAnswer')

/**
 * Select a User document given its id
 * @param idUser
 * @returns {Object}
 */
const findUser = async function(idUser) {

  answer.reset()

  try {
    let user = await User.findOne({_id:idUser}).exec();
    if (user === null) {
      answer.set(UserErrors.getError(UserErrors.ERR_USER_CANNOT_FIND_ID))
    }
    else {
      answer.setPayload({
        user: user
      })
    }
  }
  catch(err) {
    answer.set(UserErrors.getError(UserErrors.ERR_USER_INVALID_FIND_ID_REQUEST))
  }
};

module.exports = {
  findUser,
};



