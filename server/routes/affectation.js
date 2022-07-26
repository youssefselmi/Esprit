var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const Affectation = require('../models/affectation');
const Classe = require('../models/classe');
const classe = require('../models/classe');

router.use(cors());

  //let listeaffectationfinal: Affectation[];
  let listeaffectation = [];
  let listeaffectationfinal  = [];



router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {nomclasse,nomdepartement,nommodules} = req.body;
    
    try {   
            const addclasse = new Affectation({
                nomclasse,nomdepartement,nommodules});
    
             addclasse.save();
            res.status(201).json(addclasse);
 
            console.log(addclasse);
    } catch (error) {
        res.status(422).json(error);
        //console.log("err");
    }

    })


    
router.get("/read", async(req, res) => {
    Affectation.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })





  router.get("/readclasses", async(req, res,next) => {
    classe.find({}, (err, result) => {
  
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


      /*  let nomclasse= result[ct].nomclasse;
        let nomdepartement = result[ct].nomdepartement;
        let nommodules= result[ct].nommodules;

        /////////////////////// partie d'ajout ////////////////////////
      //  const {nomclasse,nomdepartement,nommodules} = req.body;
    
        //  nomclasse="aa";
        //nomdepartement="bb";
        //nommodules="js";
        try {   
            const addclasse = new Affectation({
                    nomclasse,nomdepartement,nommodules});
        
                 addclasse.save();
                res.status(201).json(addclasse);
     
                console.log(addclasse);
        } catch (error) {
            res.status(422).json(error);
            //console.log("err");
        }

        //////////////////////////////////////////////////////////////////////////*/



       // console.log(listeaffectationfinal);
       // res.send(listeaffectationfinal);
        /* for (let indexx = 0; indexx < i; indexx++) {
        listeaffectationfinal[index1]=result[ct].nomclasse+" "+index1; 
        console.log("liste affectation ===>  "+listeaffectationfinal);
       }*/



       } }




       console.log(listeaffectationfinal);
       res.send(listeaffectationfinal);

    







    })
  })




  
/*   
  router.delete('/:id', async(req, res) => {

    const id = req.params.id;
    await classe.findByIdAndRemove(id).exec();
    res.send("deleted");


});






router.put("/update/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updatecomposant = await classe.findByIdAndUpdate(id, req.body, {
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
*/











module.exports = router;