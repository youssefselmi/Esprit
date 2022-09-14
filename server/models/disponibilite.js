const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Disponibilite = new Schema({


    idenseignant:String,
    nomenseignant: String,
   
    periodes :[{
        type:String
    }],
    motif:String,
    _userId:{
        type:mongoose.Types.ObjectId,
        required: true
    }


});
module.exports = mongoose.model('disponibilites', Disponibilite);

