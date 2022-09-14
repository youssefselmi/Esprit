var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const heuresup = require('../models/heuresup');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
router.use(cors());
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




router.post('/add', authenticate,async(req, res, next) => {  
  
    // console.log(req.body);
    const {idenseignant,nomenseignant,periodes,nbreheures} = req.body;
    
    try {   
            const addheuresup = new heuresup({
                idenseignant,nomenseignant,periodes,nbreheures,_userId:req.user_id  });
    
            await addheuresup.save();
            res.status(201).json(addheuresup);
 
            console.log(addheuresup);
    } catch (error) {
        res.status(422).json(error);
    }
    })


    
router.get("/read", authenticate,async(req, res) => {
    heuresup.find({
        _userId:req.user_id
    }, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id', authenticate,async(req, res) => {

    const id = req.params.id;
    await heuresup.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


});






router.put("/update/:id", authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await heuresup.findOneAndUpdate({_id:id,user_id:req.user_id}, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;