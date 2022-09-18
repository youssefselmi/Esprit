const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Competence = new Schema({


    nomcompetence: String,
    niveau: String,
    _userId:{
        type:mongoose.Types.ObjectId,
        required: true
    }
    


});
module.exports = mongoose.model('competences', Competence);

