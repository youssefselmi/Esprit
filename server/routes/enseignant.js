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


/*

router.all('/add', async(req, res, next) => {
    


    


   
     pass:String;
     num:Number;






    const {nomenseignant,email,password,nomcompetence,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4} = req.body;





    

    
  
            const addenseignant = new enseignant({
                nomenseignant,email,password,nomcompetence,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4});



                ///////////////////// generation mdp ////////////////////
                num=(Math.random() * (8 - 1) + 1)*100;
                pass=addenseignant.nomenseignant.substr(0,4)+Math.trunc(num);
                addenseignant.password=pass;




    
            await addenseignant.save();
            res.status(201).json(addenseignant);


////////////////////////////////////////
const nameens= req.body.nomenseignant;
const typeens= req.body.type;
//const chargehorraireens =addenseignant.chargehorraire;
const chargehorraireens =1200;




const nbrcrenauxp1ens= req.body.nbrcrenauxp1;
const nbrcrenauxp2ens = req.body.nbrcrenauxp2;
const nbrcrenauxp3ens = req.body.nbrcrenauxp3;
const nbrcrenauxp4ens = req.body.nbrcrenauxp4;
const p1 = req.body.nbrcrenauxp1*21;
const p2 = req.body.nbrcrenauxp2*21;
const p3 = req.body.nbrcrenauxp3*21;
const p4 = req.body.nbrcrenauxp4*21;



const addaffectation = new affectationcharge({nomenseignant:nameens,type:typeens,chargehorraire:chargehorraireens,nbrcrenauxp1:nbrcrenauxp1ens,nbrcrenauxp2:nbrcrenauxp2ens,nbrcrenauxp3:nbrcrenauxp3ens,nbrcrenauxp4:nbrcrenauxp4ens,p1,p2,p3,p4});        
maFonction(addaffectation);
console.log(addaffectation);   



})

*/



router.post('/add', authenticate,async(req, res, next) => {  
  
     console.log(req.body);
   const {nomenseignant,email,password,nomcompetence,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4,disponibilite} = req.body;
    

 var num;
 var pass;

 num=(Math.random() * (8 - 1) + 1)*100;
 pass=nomenseignant.substr(0,4)+Math.trunc(num);


    try {   
            const adddisponibilite = new enseignant({


            

                nomenseignant,email,password:pass,nomcompetence,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4,disponibilite:1,_userId:req.user_id   });
                

    
            await adddisponibilite.save();
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









   /* function fretoure () {

    var val;
    var val1;
    var val2;
    var val3;
    var nume; 

        


  
 var les=[];

       type.find ({}, (err, result) => {
       
             if (err) {
                 console.log(err)
             }

           //  console.log("eeee==>", result);
           //  res(les);

for (let index = 0; index < result.length; index++) {
    les.push(result[index]);
            
} 


     
     les.push("ccc");
     console.log("le tableau les ", les);


    })


   // console.log("le tableau les ",  express.static);

      

                 
        for (let index = 0; index < result.length; index++) {
     
            if(result[index].typeenseignement==typeens)
            {
                  nume= result[index].nbreheures;
        
              console.log("hhhhhhhhhhhhhh"+nume);  
              
              let xx=nume;
              console.log("3asba "+xx);


                 
             }  
        }


  
            //  return nume; 

        
    
    //}

*/

     
     
     
    




 
router.get("/read",authenticate, async(req, res) => {
    enseignant.find({
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
    await enseignant.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


});






router.put("/update/:id", async(req, res) => {
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