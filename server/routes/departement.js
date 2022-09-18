var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const Departement = require('../models/departement');
router.use(cors());
const User = require('../models/user');
const jwt = require('jsonwebtoken');


let authenticate=(req,res,next)=>{
    let token=req.header('x-access-token');
    jwt.verify(token,User.getJWTSecret(),(err,decoded)=>{
        if(err){
            res.status(401).send(err);
        }
        else{
            req.user_id=decoded._id;
            next(); 
        }

    });
}

router.post('/add', authenticate, async(req, res, next) => {  
  
    // console.log(req.body);
    const {nomdepartement,location} = req.body;
    
    try {   
            const adddepartement = new Departement({
                nomdepartement,location,_userId:req.user_id });
    
            await adddepartement.save();
            res.status(201).json(adddepartement);
 
            console.log(adddepartement);
    } catch (error) {
        res.status(422).json(error);
    }
    })


    
router.get("/read",authenticate, async(req, res) => {
    Departement.find({
        _userId:req.user_id
    }, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })





 
 




   
  router.delete('/:id',authenticate, async(req, res) => {

    const id = req.params.id;
    await Departement.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


});




router.put("/update/:id",authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await Departement.findOneAndUpdate({_id:id,user_id:req.user_id}, req.body, {
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