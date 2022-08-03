var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const optup = require('../models/optup');
router.use(cors());




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
    })


    
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