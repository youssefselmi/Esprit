var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const up = require('../models/up');
router.use(cors());





router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {nomup} = req.body;
    
    try {   
            const addclasse = new up    ({
                nomup});
    
            await addclasse.save();
            res.status(201).json(addclasse);
 
            console.log(addclasse);
    } catch (error) {
        res.status(422).json(error);
    }
    })



    
router.get("/read", async(req, res) => {
    up.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



 
   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await up.findByIdAndRemove(id).exec();
    res.send("deleted");


});






router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await up.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;