var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const heuresup = require('../models/heuresup');
router.use(cors());




router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
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
    })


    
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