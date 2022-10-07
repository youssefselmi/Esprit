const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Enseignant = new Schema({


    nomenseignant: String,
    email: String,
    password : String,
    nomcompetence :[{
        type:String
    }], 

    type: String,

    chargehorraire: Number,
    nbrcrenauxp1: Number,
    nbrcrenauxp2: Number,
    nbrcrenauxp3: Number,
    nbrcrenauxp4: Number,
    
    disponibilite: Number,

    disponibilite1: Number,
    disponibilite2: Number,
    disponibilite3: Number,
    disponibilite4: Number,


    _userId:{
        type:mongoose.Types.ObjectId,
    },

    
    rep: Number,
    daterecrutement : Date,
    datesortie: Date,




     



});
module.exports = mongoose.model('enseignants', Enseignant);