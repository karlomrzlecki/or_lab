const mongoose = require('mongoose');

var schema = new mongoose.Schema({
   charname: String,
   birthname: String,
   types: [String],
   universes: [String],
   birthplace: String,
   superpowers: [String],
   religions: String,
   gender: String,
   occupation: [String],
   memberof: [String]
})

// schema.method("toJSON", function() {
//    const { __v, _id, ...object } = this.toObject();
//    object.id = _id;
//    return object;
//  });


const characters = mongoose.model('characters', schema);


module.exports = characters;