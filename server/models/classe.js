const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Classe = new Schema({


    nomclasse: String,
    //nbretudiant: Number,
    nomdepartement: String,
    
    nombreclasses: Number,
    //nommodules : String,
    nommodules : String,
    semestre: String,
    periode:[{
        type: String
    }],
    nbreenseignant: Number,
    


});
module.exports = mongoose.model('classes', Classe);

