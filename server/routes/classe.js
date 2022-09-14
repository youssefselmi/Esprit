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

const { update } = require('../models/classe');

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

        var n = 0;
       
        

        var ensiegnanttab =[];
        var ensiegnanttab2 =[];


        
       
                const addclasse = new classe({
                    nomclasse,nomdepartement,nombreclasses,nommodules,semestre,periode,nbreenseignant,_userId:req.user_id    });
                
                    
    
                    
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
                enseignant.find({
                    _userId:req.user_id
                }, (err, result) => {
       
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
                            if ((JSON.stringify(result1[index1].nommodule) ===JSON.stringify(mod)) && (JSON.stringify(result[index].nomcompetence) === JSON.stringify(result1[index1].nomcompetence)) && (JSON.stringify(result[index].disponibilite) != 0 ) &&(bool<nbr)){
                             //   console.log("bingooooooo  "+result[index].nomenseignant+" "+result[index].nomcompetence);
                                var nomenseignant1 =result[index].nomenseignant;
                               


                              //  console.log('enseignant 1111111' +result[index].id);


                                
         ///////////////// boucle pour affectation d 2 eme enseignant ////////////   
                     for (let iindex = 0; iindex < result.length; iindex++) { 
                      for (let iindex1 = 0; iindex1 < result1.length; iindex1++) { 
                           if ((JSON.stringify(result1[iindex1].nommodule) ===JSON.stringify(mod)) && (JSON.stringify(result[iindex].nomcompetence) === JSON.stringify(result1[iindex1].nomcompetence)) && (JSON.stringify(result[iindex].disponibilite) != 0 )&&(bool<nbr)){
                             if(result[iindex].nomenseignant != nomenseignant1){



                      //    console.log('enseignant 1111111' +result[iindex].id);


                   
                               // console.log(result[index].id)
                              ;
                              
                                const nomclasse=(nom+" "+x );
                                

                                bool=bool+++1;
                              //  console.log(bool);
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

                                
                    

                        //    const outputArray = filterArray(ensiegnanttab);
                          //  console.log("Original Array",ensiegnanttab);
                           // console.log("Filtered Array",outputArray);


                          /*  const occ = {};
                            for (const n of ensiegnanttab) {
                                occ[n] = occ[n] ? occ[n] + 1 : 1;
                              }*/
                            //  console.log(outputArray[0]+"  9adeh m3awed men marra==========>"+occ[outputArray[0]]);
                             // console.log(outputArray[1]+"  9adeh m3awed men marra==========>"+occ[outputArray[1]]);
                             // console.log(outputArray[2]+"   m3awed men marra==========>"+occ[outputArray[2]]);


                          //  console.log(" Array desenseignant ",ensiegnanttab);








                                var nbrc1 = result[index].nbrcrenauxp1;
                                n=n+++1;
                              updatee(result[index].id,nbrc1,n);
                                /* enseignant.findOne(
                                    {"nomenseignant":result[index].nomenseignant},
                                   
                                    
                                     function( err,element){


                                        if(err){
                                            console.log(err);
                                        }
                                 
                                    else{
                                     
                                        updatee(element)
                                        console.log(element);
                                   }
                                   }) */







                                   
                                   if(nbre==2){
                                    var nomenseignant2 =result[iindex].nomenseignant;
                                   }



                               /* disponibilite.find({}, (errdispo, resultdispo) => {
                                    if (errdispo) { console.log(errdispo) }
                                    for (let i = 0; i < resultdispo.length; i++) {
                                        
                                        if(resultdispo[i].nomenseignant == nomenseignant2 &&  resultdispo[i].nomenseignant == nomenseignant1){
                                            nomenseignant1="";
                                            nomenseignant2="";
                                        }}         
                                })*/
                                   
      

                   
                                const addaffectation = new affectation({nomclasse,nomdepartement,nommodules,semestre,periode,nomenseignant1,nomenseignant2,_userId:req.user_id}); 
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








          function filterArray(inputArr){
            var found ={};
            var out = inputArr.filter(function(element){
                return found.hasOwnProperty(element)? false : (found[element]=true);
            });
            return out;
        }


     /*   function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
          
          // usage example:
          var a = ['a', 1, 'a', 2, '1'];
          var unique = a.filter(onlyUnique);
          
          console.log(unique); // ['a', 1, 2, '1']
        */
        




          function maFonction (addaffectation)
          {
                 addaffectation.save();  
               // res.status(201).json(addaffectation);                   

          }


          
   
   

          
         async function updatee (ide,nbrc1,n){
            console.log("nnnnnnnn",n)
            //console.log(nbrc1-1);
            //console.log(ide);
            try {
                var enseignants = await enseignant.findOneAndUpdate(
                    
                {_id:ide},
                    {$set: {nbrcrenauxp1:nbrc1-1}},
                    {new : true}
                );
               
               // console.log(enseignants);
            } catch (error) {
                console.log(error);
            }
            
        
                


              

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






router.put("/update/:id", async(req, res) => {
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