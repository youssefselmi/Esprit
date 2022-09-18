var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const disponibilite = require('../models/disponibilite');
const enseignant = require('../models/enseignant');
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




router.post('/add',  authenticate,async(req, res, next) => {  
  
    // console.log(req.body);
    const {idenseignant,nomenseignant,periodes,motif} = req.body;
    
    try {   
            const adddisponibilite = new disponibilite({
                idenseignant,nomenseignant,periodes,motif,_userId:req.user_id  });
    
            await adddisponibilite.save();
            res.status(201).json(adddisponibilite);
 
            console.log(adddisponibilite);
    } catch (error) {
        res.status(422).json(error);
    }




    enseignant.findOne(
        {"nomenseignant":nomenseignant,user_id:req.user_id},
       
        
         function( err,element){


            if(err){
                console.log(err);
            }
     
        else{
         
            updatee(element)
            console.log(element);
       }
       })



    })



    function updatee (element){
           
        console.log(element.id);
        element.disponibilite = 0;
        
        element.save();
        
      }  
    


    
router.get("/read",authenticate, async(req, res) => {
    disponibilite.find({
        _userId:req.user_id
    }, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id',authenticate, async(req, res) => {

    const id = req.params.id;
    await disponibilite.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");









});



function updateens (element){
           
    console.log(element.id);
    element.disponibilite = 1; 
    element.save();
    
  }  













router.put("/update/:id",authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await disponibilite.findOneAndUpdate({_id:id,user_id:req.user_id}, req.body, {
            new: true
        });
        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;