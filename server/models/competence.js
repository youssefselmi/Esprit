const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Competence = new Schema({


    nomcompetence: String,
    niveau: String,
    


});
module.exports = mongoose.model('competences', Competence);

