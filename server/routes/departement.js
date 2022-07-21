var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const Departement = require('../models/departement');
router.use(cors());




router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {nomdepartement,location} = req.body;
    
    try {   
            const adddepartement = new Departement({
                nomdepartement,location});
    
            await adddepartement.save();
            res.status(201).json(adddepartement);
 
            console.log(adddepartement);
    } catch (error) {
        res.status(422).json(error);
    }
    })


    
router.get("/read", async(req, res) => {
    Departement.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })





 
 




   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await Departement.findByIdAndRemove(id).exec();
    res.send("deleted");


});




router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await Departement.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})






/*






 







   
router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await product.findByIdAndRemove(id).exec();
    res.send("deleted");


});













router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await product.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})
*/


   








module.exports = router;