var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const disponibilite = require('../models/disponibilite');
router.use(cors());




router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {idenseignant,nomenseignant,periodes,motif} = req.body;
    
    try {   
            const adddisponibilite = new disponibilite({
                idenseignant,nomenseignant,periodes,motif});
    
            await adddisponibilite.save();
            res.status(201).json(adddisponibilite);
 
            console.log(adddisponibilite);
    } catch (error) {
        res.status(422).json(error);
    }
    })


    
router.get("/read", async(req, res) => {
    disponibilite.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await disponibilite.findByIdAndRemove(id).exec();
    res.send("deleted");


});






router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await disponibilite.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;