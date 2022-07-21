const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Departement = new Schema({


    nomdepartement: String,
    location: String,



    
});
module.exports = mongoose.model('departements', Departement);

