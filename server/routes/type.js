var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const type = require('../models/type');
router.use(cors());




router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {typeenseignement,nbreheures} = req.body;
    
    try {   
            const addtype = new type({
                typeenseignement,nbreheures});
    
            await addtype.save();
            res.status(201).json(addtype);
 
            console.log(addtype);


      
    } catch (error) {
        res.status(422).json(error);
    }

    })


    
router.get("/read", async(req, res) => {
    type.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)


       // if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
             localStorage = new LocalStorage('./scratch');     
      //  }
        localStorage.setItem('types', JSON.stringify(result));

       // console.log("voici les departements"+result);
    })
  })



  
   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await type.findByIdAndRemove(id).exec();
    res.send("deleted");


});






router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await type.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;