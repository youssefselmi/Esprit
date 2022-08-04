var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const enseignant = require('../models/enseignant');
const affectationcharge = require('../models/affectationTableauxChargeHorraire');

router.use(cors());




router.all('/add', async(req, res, next) => {  

     pass:String;
     num:Number;

  
    // console.log(req.body);
    const {nomenseignant,email,password,nomcompetence,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4} = req.body;





    

    
  
            const addenseignant = new enseignant({
                nomenseignant,email,password,nomcompetence,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4});



                ///////////////////// generation mdp ////////////////////
                num=(Math.random() * (8 - 1) + 1)*100;
                pass=addenseignant.nomenseignant.substr(0,4)+Math.trunc(num);
                console.log("passssssssss"+pass);
                addenseignant.password=pass;
/////////////////////////////////////////////////////////////////////////////////////////////////


                if(addenseignant.type=="Normal"){

                    addenseignant.chargehorraire=189;

                }
                else if(addenseignant.type=="CUP"){

                    addenseignant.chargehorraire=168;

                }

                if(addenseignant.type=="CSP"){

                    addenseignant.chargehorraire=168;

                }


                if(addenseignant.type=="Chef option"){

                    addenseignant.chargehorraire=168;

                }


                if(addenseignant.type=="Cordinateur projet"){

                    addenseignant.chargehorraire=168;

                }


                if(addenseignant.type=="Chef département"){

                    addenseignant.chargehorraire=126;

                }

                if(addenseignant.type=="Moniteur"){

                    addenseignant.chargehorraire=63;

                }



    
            await addenseignant.save();
            res.status(201).json(addenseignant);


////////////////////////////////////////
const nameens= req.body.nomenseignant;
const typeens= req.body.type;
const chargehorraireens =addenseignant.chargehorraire;
const nbrcrenauxp1ens= req.body.nbrcrenauxp1;
const nbrcrenauxp2ens = req.body.nbrcrenauxp2;
const nbrcrenauxp3ens = req.body.nbrcrenauxp3;
const nbrcrenauxp4ens = req.body.nbrcrenauxp4;
const p1 = req.body.nbrcrenauxp1*21;
const p2 = req.body.nbrcrenauxp2*21;
const p3 = req.body.nbrcrenauxp3*21;
const p4 = req.body.nbrcrenauxp4*21;
console.log("charrrrrrrrrrrrrrrrrrrge horraire     "+chargehorraireens);


const addaffectation = new affectationcharge({nomenseignant:nameens,type:typeens,chargehorraire:chargehorraireens,nbrcrenauxp1:nbrcrenauxp1ens,nbrcrenauxp2:nbrcrenauxp2ens,nbrcrenauxp3:nbrcrenauxp3ens,nbrcrenauxp4:nbrcrenauxp4ens,p1,p2,p3,p4});        
maFonction(addaffectation);
console.log(addaffectation);   




})



            
 










    function maFonction (addaffectation)
    {
           addaffectation.save();  
         // res.status(201).json(addaffectation);                   

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