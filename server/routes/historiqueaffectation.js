var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const historiqueaffectation = require('../models/historiqueaffectation');
router.use(cors());
const User = require('../models/user');
const jwt = require('jsonwebtoken');


let authenticate=(req,res,next)=>{
    let token=req.header('x-access-token');
    jwt.verify(token,User.getJWTSecret(),(err,decoded)=>{
        if(err){
            res.status(401).send(err);
        }
        else{
            req.user_id=decoded._id;
            next(); 
        }

    });
}






router.post('/add', authenticate, async(req, res, next) => {  
  
    // console.log(req.body);
    const {nomclasse,nomdepartement,nommodules,semestre,periode,nomenseignant1,nomenseignant2,anneuni} = req.body;
    
    try {   
            const addcompetence = new historiqueaffectation({
                nomclasse,nomdepartement,nommodules,semestre,periode,nomenseignant1,nomenseignant2,anneuni,_userId:req.user_id  });
    
            await addcompetence.save();
            res.status(201).json(addcompetence);
 
            console.log(addcompetence);
    } catch (error) {
        res.status(422).json(error);
    }
    })




    
router.get("/read",authenticate, async(req, res) => {
    historiqueaffectation.find({
        _userId:req.user_id
    }, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

    })
  })



  














module.exports = router;