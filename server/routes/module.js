var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const modules = require('../models/module');
router.use(cors());




router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {nommodule,coefficient,nbrheures,attribut,nomup} = req.body;
    
    try {   
            const addclasse = new modules({
                nommodule,coefficient,nbrheures,attribut,nomup});
    
            await addclasse.save();
            res.status(201).json(addclasse);
 
            console.log(addclasse);
    } catch (error) {
        res.status(422).json(error);
    }
    })


    
router.get("/read", async(req, res) => {
    modules.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await modules.findByIdAndRemove(id).exec();
    res.send("deleted");


});



router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await modules.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;