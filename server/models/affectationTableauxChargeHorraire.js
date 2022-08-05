const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AffectationTableauxChargeHorraire = new Schema({


    nomenseignant: String,
    type: String,
    chargehorraire: Number,
    nbrcrenauxp1: Number,
    nbrcrenauxp2: Number,
    nbrcrenauxp3: Number,
    nbrcrenauxp4: Number,

    p1: Number,
    p2: Number,
    p3: Number,
    p4: Number,


    


});
module.exports = mongoose.model('AffectationTableauxChargeHorraires', AffectationTableauxChargeHorraire);

