var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const competence = require('../models/competence');
router.use(cors());




router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {nomcompetence,niveau} = req.body;
    
    try {   
            const addcompetence = new competence({
                nomcompetence,niveau});
    
            await addcompetence.save();
            res.status(201).json(addcompetence);
 
            console.log(addcompetence);
    } catch (error) {
        res.status(422).json(error);
    }
    })


    
router.get("/read", async(req, res) => {
    competence.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await competence.findByIdAndRemove(id).exec();
    res.send("deleted");


});






router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await competence.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;