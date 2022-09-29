const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Affectation = new Schema({


    nomclasse: String,
    nomdepartement: String,
    nommodules: String,
    semestre: String,
    periode:[{
        type: String
    }],
    nomenseignant1: String,
    nomenseignant2: String,
    _userId:{
        type:mongoose.Types.ObjectId,
        required: true
    },
    anneuni: String,



     


});
module.exports = mongoose.model('affectations', Affectation);

