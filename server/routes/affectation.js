var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const Affectation = require('../models/affectation');
const Classe = require('../models/classe');
const classe = require('../models/classe');
const affectation = require('../models/affectation');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.use(cors());

  //let listeaffectationfinal: Affectation[];
  let listeaffectation = [];
  let listeaffectationfinal  = [];

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


router.post('/add',  authenticate,async(req) => {  
  
    // console.log(req.body);
    const {nomclasse,nomdepartement,nommodules,semestre,periode,nomenseignant1,nomenseignant2} = req.body;
    
   
            const addclasse = new Affectation({
                nomclasse,nomdepartement,nommodules,semestre,periode,nomenseignant1,nomenseignant2,_userId:req.user_id});
    
             addclasse.save();
           // res.status(201).json(addclasse);
            console.log(addclasse);
  

    })


    
router.get("/read",authenticate,  async(req, res) => {
    Affectation.find({
       _userId:req.user_id 
    }, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })





  router.get("/readclasses",authenticate, async (req, res) => {
    classe.find({_userId:req.user_id}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
      //  res.send(result)

      let i=0;
        for (let index = 0; index < result.length; index++) {
         i=i+result[index].nombreclasses;        
        }
        console.log("taille tableau  d'affectation ==="+  i);
       
      // console.log("taille de tableau est --->" ,listeaffectation.length);

     

////////////////////// tableau d'zntiers qui contient les cases des ombres des classes ///////////////
        for (let index = 0; index < result.length; index++) {
           // const element = array[index];
            listeaffectation[index]=result[index].nombreclasses;       
        }
        console.log(listeaffectation);



////////////////////// remplir le tableaux d affectation ////////////////////
        let x=0;
       for (let ct = 0; ct < result.length; ct++) {
       for (let index1 = 1; index1 < listeaffectation[ct]+1; index1++) {
        console.log("  classe  "+result[ct].nomclasse+" "+index1+"   les matieres sont "+result[ct].nommodules);

        listeaffectationfinal[x]=result[ct].nomclasse+" "+index1; 
        x++;

        const nameclasse=result[ct].nomclasse+" "+index1;
        const namedep=result[ct].nomdepartement;
        const namemodules=result[ct].nommodules;
        maFonction(nameclasse,namedep,namemodules);


      //  console.log("===>"+nameclasse);


        /*const  newAffectation = new Affectation(req.body);
        savedAffectation.nomclasse=result[ct].nomclasse+" "+index1;
        savedAffectation.nommodules=result[ct].nommodules;
        savedAffectation.nomdepartement=result[ct].nomdepartement;
        const savedAffectation =  await  newAffectation.save();
        //res.status(200).json(savedAffectation);
        console.log("1111111 hhoho");*/


    








       } }









       console.log(listeaffectationfinal);
       res.send(listeaffectationfinal);


    })
  })

  
  function maFonction (nameclasse,namedep,namemodules)
  {
   // console.log("coucouuuuuuuuuuuuuuuu  "+nameclasse+" "+namedep+"   "+namemodules);

   let  x1=nameclasse;
   let x2=namedep;
   let x3=namemodules;

     console.log("coucouuu 1111  "+x1+" "+x2+"   "+x3);



      router.post('/add', async(x1,x2,x3,req, res, next) => {  

        console.log("kkkkkkkkkkkkkkkk "+x1+" "+x2+"   "+x3);


       /* const  newAffectation = new Affectation(req.body);
        newAffectation.nameclasse=nameclasse;
        newAffectation.namemodules=namemodules;
        newAffectation.namedep=namedep;
        const savedAffectation =    newAffectation.save();
        res.status(200).json(savedAffectation);
        console.log("1111111 hhoho");*/




         // const {nameclasse,namedep,namemodules} = req.body;
          
          try {   
                  const addclasse = new Affectation({
                      nameclasse,namedep,namemodules,_userId:req.user_id });
          
                   addclasse.save();
                  res.status(201).json(addclasse);
       
                  console.log(addclasse);
          } catch (error) {
              res.status(422).json(error);
              //console.log("err");
          }
      
          })




  }












 router.delete('/:id', authenticate,async(req, res) => {

    const id = req.params.id;
    await Affectation.findByIdAndRemove({_id:id,user_id:req.user_id}).exec();
    res.send("deleted");


});






router.put("/update/:id",authenticate,  async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await Affectation.findOneAndUpdate({_id:id,user_id:req.user_id}, req.body, {
          new: true
      });


        console.log(updatecomposant);
        res.status(201).json(updatecomposant);

    } catch (error) {
        res.status(422).json(error);
    }
})





















module.exports = router;