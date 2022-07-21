const mongoose = require('mongoose');
const _ = require("lodash");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// secret jwt
const jwtSecret ="88267339896862029647kekelepf6862029647";

var Schema = mongoose.Schema;
var User = new Schema({ 
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    sessions: [{
        token:{
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            rquired: true  
        }
    }]

    
});
//*** instance methods */
User.methods.toJSON = function(){
    const user= this;
    const userObject= user.toObject(); 

//* return the document except the password and sessions */
return _.omit(userObject,['password','sessions']);

}
User.methods.generateAccessAuthToken = function(){
    const user = this;
    return new Promise((resolve, reject)=>{
        //create the JSON Web Token and return that 
        jwt.sign({ _id: user._id.toHexString()}, jwtSecret, {expiresIn:"15m" },(err,token)=>{
            if (!err){
                resolve(token);
            }else{
                //there is an error
                reject();
            }
            
        })

    })
}
User.methods.generateRefreshAuthToken = function(){
    return new Promise((resolve, reject)=>{
       crypto.randomBytes(64,(err,buf)=>{
           if(!err){
               //no error
               let token = buf.toString('hex');
               return resolve(token);
           }
       }) 
    })
}
User.methods.createSession = function(){
    let user = this;
    return user.generateRefreshAuthToken().then((refreshToken)=>{
        return saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken)=>{
        return refreshToken;

    }).catch((e)=>{
        return Promise.reject('Failed to save session to database.\n '+e);
    })
}
/*model methods */
User.statics.findByIdAndToken = function(_id,token){
    const User = this;
    return User.findOne({
        _id,
        'session.token':token
    });
}
User.statics.findByCredentials = function(email,password){
    let User= this;
    return User.findOne({email}).then((user)=>{
        if(!user) return Promise.reject();
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password, user.password,(err,res)=>{
                if(res)resolve(user);
                else{
                    reject();
                }
            })
        })
    })
      
}
User.statics.hasRefreshTokenExpired =(expiresAt =>{
    let secondsSinceEpoch = Date.now()/1000;
    if(expiresAt> secondsSinceEpoch){
        return false;

    }else{
        return true;
    }
})

/*middleware*/  
User.pre('save',function(next){
    let User= this;
    let constFactor = 10;
    if(user.isModified('password')){
         bcrypt.genSalt(constFactor,(err,salt)=>{
             bcrypt.hash(user.password, salt, (err, hash)=>{
                 user.password = hash;
                 next();
             })
         })
    }else {
        next();
    }

});



/* Helpers Methods */
let saveSessionToDatabase=(user, refreshToken)=>{
    //save session to database
    return new Promise((resolve, reject)=>{
        let expiresAt = generateRefreshTokenExpiryTime();
        user.sessions.push({ 'token':refreshToken, expiresAt});
        user.save().then(()=>{
            return resolve(refreshToken);
        
        }).catch((e)=>{
            reject(e);
        });
    })
}
let generateRefreshTokenExpiryTime=()=>{
    let daysUntilExpire= "10";
    let secondsUntilExpire = ((daysUntilExpire *24)*60)*60;
    return ((Date.now()/1000)*secondsUntilExpire);
}
module.exports = mongoose.model('users', User);

