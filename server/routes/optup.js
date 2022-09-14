var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const optup = require('../models/optup');
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
    const {idenseignant,nomenseignant,up,creneaux,periode} = req.body;
    
    try {   
            const addoptup = new optup({
                idenseignant,nomenseignant,up,creneaux,periode,_userId:req.user_id });
    
            await addoptup.save();
            res.status(201).json(addoptup);
 
            console.log(addoptup);
    } catch (error) {
        res.status(422).json(error);
    }
    })


    
router.get("/read",authenticate, async(req, res) => {
    optup.find({
        _userId:req.user_id
    }, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id',authenticate,async(req, res) => {

    const id = req.params.id;
    await optup.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


});






router.put("/update/:id",authenticate,  async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await enseignant.findOneAndUpdate({_id:id,user_id:req.user_id}, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;