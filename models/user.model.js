const mongoose = require('mongoose');
const UserSchema = require('./user.schema');

module.exports = mongoose.model('User',UserSchema);
