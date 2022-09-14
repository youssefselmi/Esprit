var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const type = require('../models/type');
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
    const {typeenseignement,nbreheures} = req.body;
    
    try {   
            const addtype = new type({
                typeenseignement,nbreheures,_userId:req.user_id });
    
            await addtype.save();
            res.status(201).json(addtype);
 
            console.log(addtype);


      
    } catch (error) {
        res.status(422).json(error);
    }

    })


    
router.get("/read",authenticate, async(req, res) => {
    type.find({
        _userId:req.user_id
    }, (err, result) => {
  
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



  
   
  router.delete('/:id',authenticate, async(req, res) => {

    const id = req.params.id;
    await type.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


});






router.put("/update/:id",authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await type.findOneAndUpdate({_id:id,user_id:req.user_id}, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})












module.exports = router;