const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Config = require('../commons/config');

let UserSchema = new Schema({
  //
  login: {type: String, required: true, minLength:Config.USER_NAME_MIN_SIZE, maxLength:Config.USER_NAME_MAX_SIZE},
  // password is used only for direct authentication (not for CAS/google/...)
  // if it is not defined and someone tries to do a direct authentication, login must fail.
  // NB : a user cannot set his password.
  password: {type: String, minLength:Config.USER_PASSWORD_MIN_SIZE, maxLength:Config.USER_PASSWORD_MAX_SIZE},
  email: {type: String, minLength:Config.USER_EMAIL_MIN_SIZE, maxLength:Config.USER_EMAIL_MAX_SIZE},
  /* rights are
    admin : can do everything, adding µC modules, managing users, accessing data, ...
    basic : just see the stats
   */
  rights: [ {type: String, enum: Config.rights }],
  sessionId: {type: String},
},{versionKey: false});


module.exports = UserSchema;
