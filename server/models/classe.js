const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Classe = new Schema({


    nomclasse: String,
    nbretudiant: Number,
    nomdepartement: String,
    
    nombreclasses: Number,
    //nommodules : String,
    nommodules: [{
        type: String
    }]


});
module.exports = mongoose.model('classes', Classe);

