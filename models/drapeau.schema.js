const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DrapeauSchema = new Schema({
  latitude: { type: Number },
  longitude: { type: Number },
});

module.exports = DrapeauSchema;
