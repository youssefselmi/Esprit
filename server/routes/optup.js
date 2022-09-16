var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const optup = require('../models/optup');
router.use(cors());
const enseignant = require('../models/enseignant');




router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {idenseignant,nomenseignant,up,creneaux,periode} = req.body;
    
    try {   
            const addoptup = new optup({
                idenseignant,nomenseignant,up,creneaux,periode});
    
            await addoptup.save();
            res.status(201).json(addoptup);
 
            console.log(addoptup);
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
         
            updatee(element,periode,creneaux)
            console.log(element);
       }
       })







    })






    function updatee (element,periode,creneaux){
           
       
      if(periode=="P1")
      {
        element.nbrcrenauxp1 = element.nbrcrenauxp1- creneaux;

      }
      else if(periode=="P2")
      {
        element.nbrcrenauxp2 = element.nbrcrenauxp2- creneaux;

      }

      else if(periode=="P3")
      {
        element.nbrcrenauxp3 = element.nbrcrenauxp3- creneaux;

      }

      else if(periode=="P4")
      {
        element.nbrcrenauxp4 = element.nbrcrenauxp4- creneaux;

      }
        
        element.save();
        
      }  
    



  
    






















router.get("/read", async(req, res) => {
    optup.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await optup.findByIdAndRemove(id).exec();
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