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
                    
    
                    
                await addclasse.save();
                res.status(201).json(addclasse);
                console.log(addclasse);
                   




                for (let index = 1; index <= nbr; index++) {     
                    
                    const nomdepartement =dep;
                    const nommodules  =mod;
                    const semestre = sem;
                    const periode = per;
                    var bool = 0;
//const nbrc=index;
                   
                    
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
                                console.log(result[index].id)
                                
                                const nomclasse=(nom+" "+x );
                                

                                bool=bool+++1;
                                console.log(bool);
                                const addaffectation = new affectation({nomclasse,nomdepartement,nommodules,semestre,periode,nomenseignant1}); 
                                maFonction(addaffectation);
                                
                                
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
                                
                               
                               maFonction1(result[index].id,cr);
                               
                            }
                           
                            
                            }}
                       });}
                    
                    
                    });
                    /************************************ ******************/
               
                    
                            
                  //  addaffectation.save();


                    


                    


                //    res.status(201).json(addaffectation);                   
                    //console.log(addaffectation);   
                            
                }
        
           
               
              
         
     
        
        
        
        
    
          })





          function maFonction (addaffectation)
          {
                 addaffectation.save();  
               // res.status(201).json(addaffectation);                   

          }


          function maFonction1 (id,cr)
          {
            /*const updatecomposant= enseignant.findByIdAndUpdate(id,{
                nbrcrenauxp1:2,


                new: true
            });  
            console.log(updatecomposant);
               // res.status(201).json(addaffectation);  */
               
               

               enseignant.find ({}, (err, result) => {
       
                if (err) {
                    console.log(err)
                }
                

            })


              //  console.log("aa"+result);

         /*       for (let index = 0; index < result.length; index++) {

                        if(result[index].id==id )
                        {
                            if(cr=="crenaux1")
                            {
                               // result[index].nbrcrenauxp1 --;
                                var pp1=result[index].nbrcrenauxp1 --;

                                console.log("nombre crenaux le9dim1    "+result[index].nbrcrenauxp1)
                                console.log("nombre crenaux jdid1    "+pp1)
                            }
                             else if
                            (cr=="crenaux2")
                            {
                              //  result[index].nbrcrenauxp2  --;
                                var pp2=result[index].nbrcrenauxp2 --;

                                console.log("nombre crenaux le9dim2    "+result[index].nbrcrenauxp2)
                                console.log("nombre crenaux jdid2    "+pp2)
                            }

                            else if
                            (cr=="crenaux3")
                            {
                              //  result[index].nbrcrenauxp3  --;

                                var pp3=result[index].nbrcrenauxp3 --;

                                console.log("nombre crenaux le9dim3  "+result[index].nbrcrenauxp3)

                                console.log("nombre crenaux jdid3  "+pp3)
                            }

                            else  if
                            (cr=="crenaux3")
                            {
                           // result[index].nbrcrenauxp4 --;

                            var pp4=result[index].nbrcrenauxp4 --;

                            console.log("nombre crenaux le9dim4  "+result[index].nbrcrenauxp4)
                            console.log("nombre crenaux jdid4    "+pp4)
                            }
                        }
                    
                }

                console.log("aa"+result);

*/

 

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