var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const heuresup = require('../models/heuresup');
router.use(cors());

const enseignant = require('../models/enseignant');



router.post('/add', async(req, res, next) => {  
  
    const {idenseignant,nomenseignant,periodes,nbreheures} = req.body;
    
    try {   
            const addheuresup = new heuresup({
                idenseignant,nomenseignant,periodes,nbreheures});
    
            await addheuresup.save();
            res.status(201).json(addheuresup);
 
            console.log(addheuresup);
    } catch (error) {
        res.status(422).json(error);
    }



    enseignant.findOne(
        {"nomenseignant":nomenseignant},
       
        
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
           
        console.log("ahayya l 5anfoussa  "+element);

        console.log("hedhi l periode elli 5taretha  "+periodes);
        console.log("hedhi l nbreheures elli 5taretha  "+nbreheures);
      if(periodes=="P1")
      {
        element.nbrcrenauxp1 = element.nbrcrenauxp1- nbreheures;

      }
      else if(periodes=="P2")
      {
        element.nbrcrenauxp2 = element.nbrcrenauxp2- nbreheures;

      }

      else if(periodes=="P3")
      {
        element.nbrcrenauxp3 = element.nbrcrenauxp3- nbreheures;

      }

      else if(periodes=="P4")
      {
        element.nbrcrenauxp4 = element.nbrcrenauxp4- nbreheures;

      }
        
        element.save();
        
      }  
    




















    
router.get("/read", async(req, res) => {
    heuresup.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await heuresup.findByIdAndRemove(id).exec();
    res.send("deleted");


});






router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await heuresup.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;