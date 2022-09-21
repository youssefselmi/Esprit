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
         
            modifier(element,periodes)
            console.log(element);
       }
       })










    })



    function modifier (element,periodes){
           
        console.log(element.id);

        console.log("ddddddddddd   "+periodes)

        const value1 = periodes.find(v => v.includes('P1'));
        const value2 = periodes.find(v => v.includes('P2'));  
        const value3 = periodes.find(v => v.includes('P3'));  
        const value4 = periodes.find(v => v.includes('P4'));  


        if(value1)
        {
            element.disponibilite1 = 0;
 
        }

        if(value2)
        {
            element.disponibilite2 = 0;

        }

        if(value3)
        {
            element.disponibilite3 = 0;

        }

        if(value4)
        {
            element.disponibilite4 = 0;

        }

        
        
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


    disponibilite.findOne(
        {"id":req.params.id,user_id:req.user_id},
       
        
         function( err,element){
            if(err){
                console.log(err);
            }
        else{       
            modifier1(element,req.user_id)
            console.log(element);
       }    
       })



    const id = req.params.id;
    await disponibilite.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


  

});


function modifier1 (element,idd){

    console.log("bingoooooooo     ",element.nomenseignant)

    enseignant.findOne(
        {"nomenseignant":element.nomenseignant,_userId:idd },
       
        
         function( err,element1){
            if(err){
                console.log(err);
            }
        else{       
            modifierdispo(element1,element.periodes);
            console.log(element1);
       }    
       })

           }



           function modifierdispo (element,periodes){


            
        const value1 = periodes.find(v => v.includes('P1'));
        const value2 = periodes.find(v => v.includes('P2'));  
        const value3 = periodes.find(v => v.includes('P3'));  
        const value4 = periodes.find(v => v.includes('P4'));  


       if(value1){
        element.disponibilite1 = 1;

       }
    
       if(value2){

                element.disponibilite2 = 1;}


                if(value3){

     
                element.disponibilite3 = 1;}



           if(value4){

                element.disponibilite4 = 1;
    
           }


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