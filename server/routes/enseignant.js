var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const enseignant = require('../models/enseignant');
const affectationcharge = require('../models/affectationTableauxChargeHorraire');

const db = require('../database/mongodb');

const type = require('../models/type');

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






router.post('/add', authenticate,async(req, res, next) => {  
  
     console.log(req.body);
   const {nomenseignant,email,password,nomcompetence,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4,disponibilite,disponibilite1,disponibilite2,disponibilite3,disponibilite4} = req.body;
    

 var num;
 var pass;

 num=(Math.random() * (8 - 1) + 1)*100;
 pass=nomenseignant.substr(0,4)+Math.trunc(num);


    try {   
            const adddisponibilite = new enseignant({

                nomenseignant,email,password:pass,nomcompetence,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4,disponibilite:1,disponibilite1:1,disponibilite2:1,disponibilite3:1,disponibilite4:1,_userId:req.user_id   });
                

                const addenfake = new enseignant({

                    nomenseignant:"pas d'ensiegnat",email,password:pass,nomcompetence,type,chargehorraire,nbrcrenauxp1:10000,nbrcrenauxp2:10000,nbrcrenauxp3:10000,nbrcrenauxp4:10000,disponibilite:1,disponibilite1:1,disponibilite2:1,disponibilite3:1,disponibilite4:1,_userId:req.user_id   });



            await adddisponibilite.save();

            await addenfake.save();

            res.status(201).json(adddisponibilite);
 
            console.log(adddisponibilite);
    } catch (error) {
        res.status(422).json(error);
    }
    })



            
 










    function maFonction (addaffectation)
    {
           addaffectation.save();  
         // res.status(201).json(addaffectation);                   

    }


    function fval (vall)
    {
          return vall;                   
    }







     
     
    




 
router.get("/read",authenticate, async(req, res) => {
    enseignant.find({
        _userId:req.user_id
    }, (err, result) => {
  
        if (err) {
            res.send(err)
        }


        for (var key in result) {
            if(result[key].nomenseignant == "pas d'ensiegnat"){
            delete result[key];
                } }




        var result_filter = result.filter( function(val){return val !== ''} );


        res.send(result_filter)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id',authenticate, async(req, res) => {

    const id = req.params.id;
    await enseignant.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


});






router.put("/update/:id", authenticate, async(req, res) => {
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