var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const heuresup = require('../models/heuresup');
const User = require('../models/user');
const enseignant=require('../models/enseignant');
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



    enseignant.findOne(
        {"nomenseignant":nomenseignant,_userId:req.user_id},
       
        
         function( err,element){


            if(err){
                console.log(err);
            }
     
        else{
         
            updatee(element,periodes,nbreheures)
            console.log(element);
       }
       })


    })



    function updatee (element,periodes,nbreheures){
           
        console.log("nbre heure   "+nbreheures);
  
        let x=1;
  
        if(periodes=="P1")
        {
              for (let index = 0; index <nbreheures ; index++) {
                  element.nbrcrenauxp1 = element.nbrcrenauxp1 + 1;
   
              }
  
  
       //   element.nbrcrenauxp1 = element.nbrcrenauxp1 + nbreheures;
  
        }
        else if(periodes=="P2")
        {
          for (let index = 0; index <nbreheures ; index++) {
              element.nbrcrenauxp2 = element.nbrcrenauxp2 + 1;
  
          }
  
          //element.nbrcrenauxp2 = element.nbrcrenauxp2 + nbreheures;
  
        }
  
        else if(periodes=="P3")
        {
  
          for (let index = 0; index <nbreheures ; index++) {
              element.nbrcrenauxp3 = element.nbrcrenauxp3 + 1;
  
          }
  
         // element.nbrcrenauxp3 = element.nbrcrenauxp3 + nbreheures;
  
        }
  
        else if(periodes=="P4")
        {
  
          for (let index = 0; index <nbreheures ; index++) {
              element.nbrcrenauxp4 = element.nbrcrenauxp4 + 1;
  
          }
         // element.nbrcrenauxp4 = element.nbrcrenauxp4 + nbreheures;
  
        }
          
          element.save();
          
        }  
      
  
  





























    
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















router.put("/discrimentheuresup",authenticate,  async(req, res) => {

    try {
                  
        const nomenseignant=req.body.nomenseignant;
        const periodes=req.body.periodes;
        const nbreheures=req.body.nbreheures;
        
        
        const value1 = periodes.find(v => v.includes('P1'));
        const value2 = periodes.find(v => v.includes('P2'));  
        const value3 = periodes.find(v => v.includes('P3'));  
        const value4 = periodes.find(v => v.includes('P4'));  


        if(value1){
            enseignant.findOne(
                {"nomenseignant":nomenseignant,_userId:req.user_id},
                
                function( err,element){
                        
                        
                    if(err){
                        console.log(err);
                    }
             
                else{
                 
                    mupdatenb1(element,nbreheures)
                    console.log(element);
               }
               })

        }
        if(value2){
            enseignant.findOne(
                {"nomenseignant":nomenseignant,_userId:req.user_id},
                
                function( err,element){
                        
                        
                    if(err){
                        console.log(err);
                    }
             
                else{
                 
                    mupdatenb2(element,nbreheures)
                    console.log(element);
               }
               })

        }
        if(value3){
            enseignant.findOne(
                {"nomenseignant":nomenseignant,_userId:req.user_id},
                
                function( err,element){
                        
                        
                    if(err){
                        console.log(err);
                    }
             
                else{
                 
                    mupdatenb3(element,nbreheures)
                    console.log(element);
               }
               })

        }
        if(value4){
            enseignant.findOne(
                {"nomenseignant":nomenseignant,_userId:req.user_id},
                
                function( err,element){
                        
                        
                    if(err){
                        console.log(err);
                    }
             
                else{
                 
                    mupdatenb4(element,nbreheures)
                    console.log(element);
               }
               })

        }
    } catch (error) {
        res.status(422).json(error);
    }

})
function mupdatenb1 (element,nbreheures){         
    element.nbrcrenauxp1 = element.nbrcrenauxp1 - nbreheures;
    element.save();           
    } 


    function mupdatenb2 (element,nbreheures){         
        element.nbrcrenauxp2 = element.nbrcrenauxp2 - nbreheures;
        element.save();           
        } 


        function mupdatenb3 (element,nbreheures){         
            element.nbrcrenauxp3 = element.nbrcrenauxp3 - nbreheures;
            element.save();           
            } 


            function mupdatenb4 (element,nbreheures){         
                element.nbrcrenauxp4 = element.nbrcrenauxp4 - nbreheures;
                element.save();           
                } 












module.exports = router;