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

    


});
module.exports = mongoose.model('affectations', Affectation);

