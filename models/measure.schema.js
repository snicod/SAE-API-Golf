const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MeasureSchema = new Schema({
    // kindof measure
    type: {type: String, required: true},
    // timestamp
    date: {type: Date, required: true, default: Date.now},
    // value, as a string to be universal
    value: {type: String, required: true},
    // if the measure comes from a module, store it
    module: {type: Schema.Types.ObjectId, ref: 'Module'},
},{versionKey: false});

module.exports = MeasureSchema;
