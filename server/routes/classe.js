var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const Departement = require('../models/classe');
const classe = require('../models/classe');
const affectation = require('../models/affectation');
const type = require('../models/type');
const enseignant = require('../models/enseignant');
const modulee = require('../models/module');
const disponibilite = require('../models/disponibilite');
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















    router.all('/add',authenticate,(req, res) => {  
        const {nomclasse,nomdepartement,nombreclasses,nommodules,semestre,periode,nbreenseignant,anneuni} = req.body;
        const nbr= req.body.nombreclasses;
        const nom= req.body.nomclasse;
        const dep= req.body.nomdepartement;
        const mod= req.body.nommodules;
        const sem = req.body.semestre;
        const per = req.body.periode;
        const nbre = req.body.nbreenseignant;
        const au = req.body.anneuni;

        var x = 1;

       

       


        
       
                const addclasse = new classe({
                    nomclasse,nomdepartement,nombreclasses,nommodules,semestre,periode,nbreenseignant,anneuni,_userId:req.user_id    });
                

                for (let index = 1; index <= nbr; index++) {     
                    
                    const nomdepartement =dep;
                    const nommodules  =mod;
                    const semestre = sem;
                    const periode = per;
                    var bool = 0;
                    const nomclasse=(nom+" "+x );
                              
                    const anneuni= au;




                        
                                   
      

                   
                                const addaffectation = new affectation({nomclasse,nomdepartement,nommodules,semestre,periode,anneuni,_userId:req.user_id}); 

                                x=x+++1;

                                maFonction(addaffectation);
                                
                                
                              
                            
                               
                            }
                            addclasse.save();
                            res.status(201).json(addclasse);
                            console.log(addclasse);
                            
                            });
        
           
               



 

                
               

    










    




          function maFonction (addaffectation)
          {
                 addaffectation.save();  
               // res.status(201).json(addaffectation);                   

          }


          
   
   

          
         
        
        














    
router.get("/read",authenticate, async(req, res) => {
    classe.find({
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
    await classe.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


});






router.put("/update/:id", authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await classe.findOneAndUpdate({_id:id,user_id:req.user_id}, req.body, {
            new: true
        });

        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})




router.get("/readinfo", async(req, res) => {
let informatique='informatique'

    function getclasses (informatique){
    }

    classe.find({}, (err, result) => {


        for (var key in result) {
            if(result[key].nomdepartement != informatique){
            delete result[key];
                } }




        var result_filter = result.filter( function(val){return true} );
        if (err) {
            res.send(err)
        }
        res.send(result_filter)

    })
    
})











router.get("/readmecanique", async(req, res) => {
  
    
        classe.find({}, (err, result) => {
    
    
            for (var key in result) {
                if(result[key].nomdepartement != 'mecanique'){
                delete result[key];
                    } }
    
    
    
    
            var result_filter = result.filter( function(val){return true} );
            
            if (err) {
                res.send(err)
            }
            res.send(result_filter)
    
        })
    })









    router.get("/readmecatronique", async(req, res) => {
  
    
        classe.find({}, (err, result) => {
    
    
            for (var key in result) {
                if(result[key].nomdepartement != 'mecatronique'){
                delete result[key];
                    } }
    
    
    
    
            var result_filter = result.filter( function(val){return val !== ''} );
            if (err) {
                res.send(err)
            }
            res.send(result_filter)
    
        })
    })




    router.get("/readtelecommunication", async(req, res) => {
  
    
        classe.find({}, (err, result) => {
    
    
            for (var key in result) {
                if(result[key].nomdepartement != 'telecommunication'){
                delete result[key];
                    } }
    
    
    
    
            var result_filter = result.filter( function(val){return val !== ''} );
            if (err) {
                res.send(err)
            }
            res.send(result_filter)
    
        })
    })












module.exports = router;