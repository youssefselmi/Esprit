const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Departement = new Schema({


    nomdepartement: String,
    location: String,
    _userId:{
        type:mongoose.Types.ObjectId,
        required: true
    }



    
});
module.exports = mongoose.model('departements', Departement);

