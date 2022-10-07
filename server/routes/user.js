var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
router.use(cors());
const crypto = require('crypto');
const bcrypt = require('bcryptjs');




/**check wether the request has a valid JWT access token */


/** verify refresh token middleware(wich will be verifying the session) */
let verifySession = (req, res, next)=>{
    let refreshToken = req.header('x-refresh-token');
    let _id=req.header('_id');
    User.findByIdAndToken(_id, refreshToken).then((user)=>{
        if(!user){
            return Promise.reject({
                'error': 'user not found .'
            });
        }
        req.user_id=user._id;
        req.refreshToken = refreshToken;
        req.userObject = user;
        let isSessionValid = false;
        user.sessions.forEach((session)=>{
            if(session.token === refreshToken){
                //check if the token session has expired
                if(User.hasRefreshTokenExpired(session.expiresAt)===false){
                    //refresh token has not expired
                    isSessionValid=true;
                }
            }
        });
        if(isSessionValid){
            next();

        }else{
            return Promise.reject({
                'error': 'Refresg token has expired'
            })
        }
    }).catch((e)=>{
        res.status(401).send(e);
    })

}
//cors headers middleware
router.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-with,Content-Type,Accept,x-access-token,x-refresh-token");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
})
/* USER ROUTES*/
/*
*POST /users
*Sign up
*/
router.post('/users', async(req, res)=>{
    //sign up
    let body=req.body;
    let email=req.body.email;
    
    let newUser = new User(body);
    User.findOne({email:email},((err,user)=>{
        if(user){
            console.log("mail exist");
            return res.json({msg:0})        }
           
                    else{
    newUser.save().then(()=>{
        return newUser.createSession();
    }).then((refreshToken)=>{
        //session created successfully - refreshToken returned
        // now we generate an access auth token for the user
        return newUser.generateAccessAuthToken().then((accessToken)=>{
            return{accessToken, refreshToken}
        });
    }).then((authTokens)=>{
        res
            .header('x-refresh-token',authTokens.refreshToken)
            .header('x-access-token',authTokens.accessToken)
            .send(newUser);
    }).catch((e)=>{
        res.status(400).send(e);
    })
}
}))

})



/* USER ROUTES*/
/*
*POST /users/login
*Log in
*/
router.post('/users/login', async(req, res)=>{
    let email = req.body.email;
    let password= req.body.password;
    User.findOne({email:email},((err,user)=>{
        if(!user){
            console.log("mail does not exist");
            return res.json({msg:0})        }
            else{
                bcrypt.compare(password,user.password).then((match)=>{
                    if(!match){
                        console.log("wrong password");
                        res.json({msg:1});
                    }
                    else{
            
         
   
     User.findByCredentials(email,password).then((user) =>{
         return user.createSession().then((refreshToken) =>{
             //session created successffuly
             // now we generate an access auth token for the user
             return user.generateAccessAuthToken().then((accessToken)=>{
                 return {accessToken, refreshToken}
             });
         }).then((authToken)=>{
            res
                .header('x-refresh-token',authToken.refreshToken)
                .header('x-access-token',authToken.accessToken)
                .send(user);
        }).catch((e)=>{
            res.status(400).send(e);
        })
     }).catch((e)=>{
         res.status(400).send(2);

     })
    }
})
    }
    }))
})
/**
 * generate and returns an access token
 */
router.get('/users/me/access-token',verifySession,(req,res)=>{
    req.userObject.generateAccessAuthToken().then((accessToken)=>{
        res.header('x-access-token',accessToken).send({accessToken});
    }).catch((e)=>{
        res.status(400).send(e);
    });

})
router.get('/users/getbyid/:id',async(req, res) => {

    const  {id} = req.params.id;
    await User.findById({id}, (err, result) => {

        if (err) {
            res.send(err)
        }
        res.send(result)
})
})

router.put("/users/forgetpassword",async(req,res)=>{
    const emaill = req.body.email;
    var passwordd= req.body.password;
   
    updatepassword(passwordd,emaill);
    





})
function updatepassword(password,emaill){
    console.log(password);
    User.findOne({email:emaill

    }, function( err,element){


        if(err){
            console.log(err);
        }

    else{
     element.password =password;
     element.save();
   }
   }
    )





}








module.exports = router;


       