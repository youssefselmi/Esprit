const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Enseignant = new Schema({


    nomenseignant: String,
    email: String,
    password : String,
    nomcompetence :[{
        type:String
    }],
    type:String,
    

    


});
module.exports = mongoose.model('enseignants', Enseignant);

