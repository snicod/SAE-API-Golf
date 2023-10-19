const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChipsetSchema = new Schema({

  name: { type: String, required: true},
  description: { type: String},
  links: [{ type: String}],
  // caps are what kind of measure/functionnality the chipset is able to
  caps: [ {type: String, required: true} ],
},{versionKey: false});

module.exports = ChipsetSchema;
