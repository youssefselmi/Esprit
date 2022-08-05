var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const affectaiontab = require('../models/affectationTableauxChargeHorraire');
router.use(cors());





router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {nomenseignant,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4,p1,p2,p3,p4} = req.body;
    
    try {   
            const addenseignant = new affectaiontab({
                nomenseignant,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4,p1,p2,p3,p4});



    
            await addenseignant.save();
            res.status(201).json(addenseignant);

            
 
            console.log(addenseignant);
    } catch (error) {
        res.status(422).json(error);
    }
    })






    
router.get("/read", async(req, res) => {
    affectaiontab.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await affectaiontab.findByIdAndRemove(id).exec();
    res.send("deleted");


});






router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await affectaiontab.findByIdAndUpdate(id, req.body, {

              
            new: true
        });
   
        

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;