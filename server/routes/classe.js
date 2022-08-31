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
const { update } = require('../models/classe');

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













    router.all('/add',(req, res) => {  
  
        // console.log(req.body);
        const {nomclasse,nomdepartement,nombreclasses,nommodules,semestre,periode,nbreenseignant} = req.body;
        const nbr= req.body.nombreclasses;
        const nom= req.body.nomclasse;
        const dep= req.body.nomdepartement;
        const mod= req.body.nommodules;
        const sem = req.body.semestre;
        const per = req.body.periode;
        const nbre = req.body.nbreenseignant;
        var x = 1;
        
        
       
                const addclasse = new classe({
                    nomclasse,nomdepartement,nombreclasses,nommodules,semestre,periode,nbreenseignant});
                    
    
                    
              /*   await addclasse.save();
                res.status(201).json(addclasse);
                console.log(addclasse); */
                   
























                for (let index = 1; index <= nbr; index++) {     
                    
                    const nomdepartement =dep;
                    const nommodules  =mod;
                    const semestre = sem;
                    const periode = per;
                    var bool = 0;
                              
                         /***************************** ***************** */
                enseignant.find({}, (err, result) => {
       
                    if (err) {
                        console.log(err)
                    }
                    //console.log("************enseignant***************"+result)
                    for (let index = 0; index < result.length; index++) { 
                    modulee.find({}, (err1, result1) => {
       
                        if (err1) {
                            console.log(err1)
                        }
                        else{
                        for (let index1 = 0; index1 < result1.length; index1++) { 
                            if ((JSON.stringify(result1[index1].nommodule) ===JSON.stringify(mod)) && (JSON.stringify(result[index].nomcompetence) === JSON.stringify(result1[index1].nomcompetence))&&(bool<nbr)){
                                console.log("bingooooooo  "+result[index].nomenseignant+" "+result[index].nomcompetence);



                                const nomenseignant1 =result[index].nomenseignant;


         ///////////////// boucle pour affectation d 2 eme enseignant ////////////   
                     for (let iindex = 0; iindex < result.length; iindex++) { 
                      for (let iindex1 = 0; iindex1 < result1.length; iindex1++) { 
                           if ((JSON.stringify(result1[iindex1].nommodule) ===JSON.stringify(mod)) && (JSON.stringify(result[iindex].nomcompetence) === JSON.stringify(result1[iindex1].nomcompetence))&&(bool<nbr)){
                             if(result[iindex].nomenseignant != nomenseignant1){

                         



                   
                                console.log(result[index].id)
                                
                                const nomclasse=(nom+" "+x );
                                

                                bool=bool+++1;
                                console.log(bool);
                                const value = periode.find(v => v.includes('P1'));
                                const value1 = periode.find(v => v.includes('P2'));

                                
                                if((semestre==="S1")&&(value)){
                                    console.log("P1");
                                    var cr="crenaux1";
                                }
                                if((semestre==="S1")&&(value1)){
                                    console.log("P2");
                                    var cr="crenaux2";

                                }
                                if((semestre==="S2")&&(value)){
                                    console.log("P3");
                                    var cr="crenaux3";

                                }
                                if((semestre==="S2")&&(value1)){
                                    console.log("P4");
                                    var cr="crenaux4";

                                }
                                x=x+++1;

                                
                               
                            //   maFonction1(result[index].id,cr);
                               /*  try {
                                    
                                    console.log('iddddddd'+result[index].id);
                                    const update = { nbrcrenauxp1: 1 };
                                    const updatecomposant =  enseignant.findByIdAndUpdate(result[index].id,update);
                            
                                    console.log(updatecomposant);
                                    res.status(201).json(updatecomposant);
                            
                                } catch (error) {
                                    res.status(422).json(error);
                                } */
                                //updatee(result[index].nomenseignant,result[index].nbrcrenauxp1-1);


                                const nbrcrenauxp1 = 1;
                                enseignant.findOne(
                                    {"nomenseignant":result[index].nomenseignant},
                                   
                                    
                                     function( err,element){
                                       // console.log("aaaaaaaaaaa   "+element);


                                        if(err){
                                            console.log(err);
                                        }
                                 
                                    else{
                                     
                                        updatee(element)
                                        console.log(element);
                                   }
                                   })







                                   
                                   if(nbre==2){
                                    var nomenseignant2 =result[iindex].nomenseignant;
                                   }
                                   
      
                   
                                const addaffectation = new affectation({nomclasse,nomdepartement,nommodules,semestre,periode,nomenseignant1,nomenseignant2}); 
                                maFonction(addaffectation);
                                
                                
                              
                            
                               
                            }
                           
                            
                            }}

                        ////////////// fermeture de la boucle de 2 eme enseignant //////////////   
                        }}}}



                       });}
                    
                    
                    });
                   
                            
                }
        
           
               


















                
              

                addclasse.save();
                res.status(201).json(addclasse);
                console.log(addclasse);

          })





          function maFonction (addaffectation)
          {
                 addaffectation.save();  
               // res.status(201).json(addaffectation);                   

          }


          
   
   

          
         function updatee (element){
           
            console.log(element.id);
            element.nbrcrenauxp1 = element.nbrcrenauxp1-1;
         //   element.nbrcrenauxp2 = 2;
            
            element.save();
            
            /*.then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });*/
        
                


              

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