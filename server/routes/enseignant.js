var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const enseignant = require('../models/enseignant');
router.use(cors());




router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {nomenseignant,email,password,competence} = req.body;
    
    try {   
            const addenseignant = new enseignant({
                nomenseignant,email,password,competence});
    
            await addenseignant.save();
            res.status(201).json(addenseignant);
 
            console.log(addenseignant);
    } catch (error) {
        res.status(422).json(error);
    }
    })


    
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