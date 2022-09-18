const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Type = new Schema({


    typeenseignement:String,
    nbreheures:Number,
    _userId:{
        type:mongoose.Types.ObjectId,
        required: true
    }

});
module.exports = mongoose.model('types', Type);

