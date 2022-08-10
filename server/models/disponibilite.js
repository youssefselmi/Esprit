const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Disponibilite = new Schema({


    idenseignant:String,
    nomenseignant: String,
   
    periodes :[{
        type:String
    }],
    motif:String,


});
module.exports = mongoose.model('disponibilites', Disponibilite);

