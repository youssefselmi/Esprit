var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const User = require('../models/user');
router.use(cors());



/* USER ROUTES*/
/*
*POST /users
*Sign up
*/
router.post('/users', async(req, res)=>{
    //sign up
    let body=req.body;
    let newUser = new User(body);
    newUser.save().then(()=>{
        return newUser.createSession();
    }).then((refreshToken)=>{
        //session created successfully - refreshToken returned
        // now we generate an access auth token for the user
        return newUser.generateAccessAuthToken().then((accessToken)=>{
            return{accessToken, refreshToken}
        });
    }).then((authToken)=>{
        res 
            .header('x-refresh-token',authToken.refreshToken)
            .header('x-access-token',authToken.accessToken)
            .send(newUser);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})


/* USER ROUTES*/
/*
*POST /users/login
*Log in
*/
router.post('/users/login', async(req, res)=>{
    let email = req.body.email;
    let password= req.body.password;
     User.findByCredentials(email,password).then((user) =>{
         return user.createSession().then((refreshToken) =>{
             //session created successffuly
             // now we generate an access auth token for the user
             return user.generateAcessAuthToken().then((accessToken)=>{
                 return {accessToken, refreshToken}
             });
         }).then((authToken)=>{
            res 
                .header('x-refresh-token',authToken.refreshToken)
                .header('x-access-token',authToken.accessToken)
                .send(newUser);
        }).catch((e)=>{
            res.status(400).send(e);
        })
     }).catch((e)=>{
         res.status(400).send(2);
     })
})




module.exports = router;