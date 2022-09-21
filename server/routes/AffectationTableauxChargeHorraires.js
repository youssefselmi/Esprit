var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const affectaiontab = require('../models/affectationTableauxChargeHorraire');
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



router.post('/add', authenticate,async(req, res, next) => {  
  
    // console.log(req.body);
    const {nomenseignant,type,chargehorraire,nbrcrenauxp1,nbrcrenauxp2,nbrcrenauxp3,nbrcrenauxp4,p1,p2,p3,p4} = req.body;
      
    try {   
            const addenseignant = new affectaiontab({

                nomenseignant,type,chargehorraire,nbrcrenauxp1:0,nbrcrenauxp2:0,nbrcrenauxp3:0,nbrcrenauxp4:0,p1:0,p2:0,p3:0,p4:0,charges1:0,charges2:0,_userId:req.user_id  });

            await addenseignant.save();
            res.status(201).json(addenseignant);

            
 
            console.log(addenseignant);
    } catch (error) {
        res.status(422).json(error);
    }
    })






    
router.get("/read",authenticate, async(req, res) => {
    affectaiontab.find({
        _userId:req.user_id
    }, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

    })
  })




  


  
   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await affectaiontab.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


});






router.put("/update/:id",authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await affectaiontab.findOneAndUpdate({_id:id,user_id:req.user_id}, req.body, {
            new: true
        });
        

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;