var express = require('express');
var router = express.Router();
var Besoin = require('../models/product');
const app = express();
let cors = require("cors");
const product = require('../models/product');
router.use(cors());





router.get("/read", async(req, res) => {
    product.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
  })









  

 
router.post('/add', async(req, res, next) => {  
  
   
   // console.log(req.body);
   const {productName,category,date,freshness,price,comment} = req.body;
   
   try {   
           const addproduct = new Besoin({
            productName,category,date,freshness,price,comment});
   
           await addproduct.save();
           res.status(201).json(addproduct);

           console.log(addproduct);
   } catch (error) {
       res.status(422).json(error);
   }
   })







   
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



   








module.exports = router;