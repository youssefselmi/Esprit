var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const enseignant = require('../models/enseignant');
const affectationcharge = require('../models/affectationTableauxChargeHorraire');

const db = require('../database/mongodb');

const type = require('../models/type');

router.use(cors());



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
//const chargehorraireens =1200;




/////////////////////////////////////////////////////////////////////////////////////////////////////
var demo = fretoure(req.body.type);
console.log("charge horraire   "+ demo );


//////////////////////////////////////////////////////////////////////////////////////////////////








const nbrcrenauxp1ens= req.body.nbrcrenauxp1;
const nbrcrenauxp2ens = req.body.nbrcrenauxp2;
const nbrcrenauxp3ens = req.body.nbrcrenauxp3;
const nbrcrenauxp4ens = req.body.nbrcrenauxp4;
const p1 = req.body.nbrcrenauxp1*21;
const p2 = req.body.nbrcrenauxp2*21;
const p3 = req.body.nbrcrenauxp3*21;
const p4 = req.body.nbrcrenauxp4*21;



const addaffectation = new affectationcharge({nomenseignant:nameens,type:typeens,chargehorraire:demo,nbrcrenauxp1:nbrcrenauxp1ens,nbrcrenauxp2:nbrcrenauxp2ens,nbrcrenauxp3:nbrcrenauxp3ens,nbrcrenauxp4:nbrcrenauxp4ens,p1,p2,p3,p4});        
maFonction(addaffectation);
console.log(addaffectation);   


    



})



            
 










    function maFonction (addaffectation)
    {
           addaffectation.save();  
         // res.status(201).json(addaffectation);                   

    }



 

    var val;
    var val1;
    var val2;
    var val3;

    var nume;

    function fretoure (typeens) {
         console.log("type de l'enseignant  "+typeens)
     
         type.find({}, (err, result) => {
       
             if (err) {
                 console.log(err)
             }
             console.log("voici les typees elli mawjoudin lenna "+result)


                 
         for (let index = 0; index < result.length; index++) {
     
            if(result[index].typeenseignement==typeens)
            {
                  nume= result[index].nbreheures;
        
              console.log("hhhhhhhhhhhhhh"+nume);

              val=nume;
              
            // return nume;
            

            }
            val1=val;
        }

        val2=val1;

            }) 

            val3=val2;

     


            console.log("el valeur "+ val3);
           return val3;


      


     
     }
     
    




 
router.get("/read", async(req, res) => {
    enseignant.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await enseignant.findByIdAndRemove(id).exec();
    res.send("deleted");


});






router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await enseignant.findByIdAndUpdate(id, req.body, {

              
            new: true
        });
   
        

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;