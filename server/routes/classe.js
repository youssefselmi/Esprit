var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");
const Departement = require('../models/classe');
const classe = require('../models/classe');
const affectation = require('../models/affectation');

router.use(cors());




/*router.post('/add', async(req, res, next) => {  
  
    // console.log(req.body);
    const {nomclasse,nomdepartement,nombreclasses,nommodules} = req.body;
    
    try {   
            const addclasse = new classe({
                nomclasse,nomdepartement,nombreclasses,nommodules});
    
            await addclasse.save();
            res.status(201).json(addclasse);
 
            console.log(addclasse);
    } catch (error) {
        res.status(422).json(error);
    }
    })*/













    router.all('/add', async(req, res, next) => {  
  
        // console.log(req.body);
        const {nomclasse,nomdepartement,nombreclasses,nommodules,semestre,periode} = req.body;
        const nbr= req.body.nombreclasses;
        const nom= req.body.nomclasse;
        const dep= req.body.nomdepartement;
        const mod= req.body.nommodules;
        const sem = req.body.semestre;
        const per = req.body.periode;
        
        
       
                const addclasse = new classe({
                    nomclasse,nomdepartement,nombreclasses,nommodules,semestre,periode});
                    
    
                    
                await addclasse.save();
                res.status(201).json(addclasse);
                console.log(addclasse);




                for (let index = 1; index <= nbr; index++) {     
                    const nomclasse=(nom+" "+  index);
                    const nomdepartement =dep;
                    const nommodule  =mod;
                    const semestre = sem;
                    const periode = per;
                    for (var i = 0; i < nommodule.length; i++) {
                        
                        const nommodules = nommodule[i];
                        console.log(nommodules);
                    
                    const addaffectation = new affectation({nomclasse,nomdepartement,nommodules,semestre,periode});        
                  //  addaffectation.save();


                    maFonction(addaffectation);



                //    res.status(201).json(addaffectation);                   
                    console.log(addaffectation);   
                }              
                }
        
           
               
              
         
     
        
        
        
        
    
          })





          function maFonction (addaffectation)
          {
                 addaffectation.save();  
               // res.status(201).json(addaffectation);                   

          }
        
        














    
router.get("/read", async(req, res) => {
    classe.find({}, (err, result) => {
  
        if (err) {
            res.send(err)
        }
        res.send(result)

       // console.log("voici les departements"+result);
    })
  })



  
   
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












module.exports = router;