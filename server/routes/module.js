var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const modules = require('../models/module');
const user = require('../routes/user');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.use(cors());

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
    const {nommodule,coefficient,nbrheures,nomup,nomcompetence} = req.body;
    
    try {   
            const addclasse = new modules({

                nommodule,coefficient,nbrheures,nomup,nomcompetence,_userId:req.user_id    });

    
            await addclasse.save();
            res.status(201).json(addclasse);
 
            console.log(addclasse);
    } catch (error) {
        res.status(422).json(error);
    }
    })


    
router.get("/read",authenticate, async(req, res) => {
    modules.find({
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
    await modules.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


});



router.put("/update/:id",authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await modules.findOneAndUpdate({_id:id,user_id:req.user_id}, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;