var express = require('express');
var router = express.Router();
const app = express();
let cors = require("cors");;
const enseignant = require('../models/enseignant');
const tableauhorraire = require('../models/affectationTableauxChargeHorraire');


const modulee = require('../models/module');
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
    router.post('/read',authenticate,(req, res) => {  
        
        const nommodules= req.body.nommodules;
        const semestre = req.body.semestre;
        const periode = req.body.periode; 
        console.log(req.body);
    
        console.log(req.body);
        var x = 1;
        var n = 0;          
        var bool = 0;
        let nomenseignants=[];
       
                              
                   
                enseignant.find({
                    _userId:req.user_id
                }, (err, result) => {
        
                    if (err) {
                        console.log(err)
                    }
                 



                    
                    for (let index = 0; index < result.length; index++) {
                      
                         
                    modulee.find({ _userId:req.user_id 
                    }, (err1, result1) => {
       
                        if (err1) {
                            console.log(err1)
                        }
                        else{
                           // console.log(result1);
                        for (let index1 = 0; index1 < result1.length; index1++) { 
                            
                          // console.log(nommodules);
                          if (   (JSON.stringify(result1[index1].nommodule) ===JSON.stringify(nommodules)) && (result[index].nomcompetence.find(v=>v.includes(result1[index1].nomcompetence)) || (JSON.stringify(result[index].nomcompetence) === JSON.stringify(result1[index1].nomcompetence))) && (JSON.stringify(result[index].disponibilite) != 0 ) )
                            
                            
                            {
                                nomenseignant =result[index].nomenseignant;
                               // console.log("hahahah"+nomenseignant );
                               // res.status(201).json(nomenseignant);
                                bool=bool+++1;
                                const value = periode.find(v => v.includes('P1'));
                                const value1 = periode.find(v => v.includes('P2'));  
                                if((semestre==="S1")&&(value)){
                                    console.log("P1");
                                    if(result[index].nbrcrenauxp1 >0 && result[index].disponibilite1!=0 ){
                                        nomenseignants.push(result[index]);
                                        //console.log(nomenseignants)
                                       // res.status(201).json(nomenseignants);
                                        //console.log(x);
                                       
                                        
                                      
                                    }else{
                                        if(result[index].nbrcrenauxp1==0){
                                            console.log(result[index].nomenseignant+"  non disponible")

                                        }
                                    }
                                    
                                }
                                if((semestre==="S1")&&(value1)){
                                    console.log("P2");
                                    if(result[index].nbrcrenauxp2>0 &&  result[index].disponibilite2!=0 ){
                                        nomenseignants.push(result[index]);
                                    }
                                  

                                }
                                if((semestre==="S2")&&(value)){
                                    console.log("P3"); 
                                    if(result[index].nbrcrenauxp3 >0 && result[index].disponibilite3!=0 ){
                                        nomenseignants.push(result[index]);
                                    }

                                }
                                if((semestre==="S2")&&(value1)){
                                    console.log("P4");
                                    if(result[index].nbrcrenauxp4 > 0 &&   result[index].disponibilite4!=0 ){
                                        nomenseignants.push(result[index]);
                                    }
                                        

                                }
                            
                              
                                

                                
                                

                                
                                mafonction(res,index,result,nomenseignants,index1,result1);
                               // console.log(nomenseignants);

                




                                n=n+++1;
                    






                             
                               
                            } 
                            else{
                                mafonction(res,index,result,nomenseignants,index1,result1);
                            }
                            
                            }}
                            

    
                                     
                    });
                         
                  
                     }
                      })
                     // console.log(nomenseignants);
                     
 
      } );
     function mafonction(res,index,result,nomenseignants,index1,result1){
       
         if((index==result.length-1)&&(index1==result1.length-1) ){
           
            let nomenseignantss = [...new Set(nomenseignants)];

            res.send(nomenseignantss);
                     
                      
                     } 

     }









































     router.put("/update",authenticate,  async(req, res) => {

console.log("bingoooooooooooooooooooooooooo");


        try {
      
            const nomenseignant=req.body.nomenseignant;
            const periode=req.body.periode;
            const semestre=req.body.semestre;
      

            const value = periode.find(v => v.includes('P1'));
            const value1 = periode.find(v => v.includes('P2'));  

         


            if((semestre==="S1")&&(value)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant,
                    _userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        updatee1(element)
                        console.log(element);
                   }
                   })
            
            
            }

            
            if((semestre==="S1")&&(value1)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant,       _userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        updatee2(element)
                        console.log(element);
                   }
                   })
            
            
            }


            if((semestre==="S2")&&(value)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant, _userId:req.user_id },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        updatee3(element)
                        console.log(element);
                   }
                   })
            
            
            }


            if((semestre==="S2")&&(value1)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant,_userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        updatee4(element)
                        console.log(element);
                   }
                   })
            
            
            }



      
          
      
       
            console.log(updatecomposant);
            res.status(201).json(updatecomposant);
     
        } catch (error) {
            res.status(422).json(error);
        }
      })
      







      


      function updatee1 (element){

     
              
          element.nbrcrenauxp1 = element.nbrcrenauxp1- 1;
          element.save();


      

        }  
      
      


        function updatee2 (element){
              
            element.nbrcrenauxp2 = element.nbrcrenauxp2- 1;
          element.save();
            
          }  
        



          function updatee3 (element){
              
            element.nbrcrenauxp3 = element.nbrcrenauxp3- 1;
          element.save();
            
          }  
        


          
      function updatee4 (element){
              
        element.nbrcrenauxp4 = element.nbrcrenauxp4- 1;
      element.save();
        
      }  
    







































      router.put("/increment", authenticate, async(req, res) => {

        

        console.log("bingoooooooooooooooooooooooooo"+req.body.nomenseignant1);
        console.log("bingoooooooooooooooooooooooooo"+req.body.nomenseignant2);
        console.log("bingoooooooooooooooooooooooooo"+req.body.periode);
        console.log("bingoooooooooooooooooooooooooo"+req.body.semestre);

        
                try {
              
                    console.log("1");
  
                    const nomenseignant1=req.body.nomenseignant1;
                    console.log("2");

                    const nomenseignant2=req.body.nomenseignant2;
                    console.log("3");

                    const periode=req.body.periode;
                    console.log("4");

                    const semestre=req.body.semestre;
                    console.log("5");

                    console.log(typeof periode);

                    console.log("aymen ",periode);
      
        console.log("hoohhohohohoho"+nomenseignant1+nomenseignant2+periode+semestre)
        console.log("6");
        
        const valuep1 = periode.includes('P1');
        console.log("7",valuep1);

        const valuep2 = periode.includes('P2');  
        console.log("8",valuep2);

        const valuep3 = periode.includes('P3');  
        console.log("9",valuep3);

        const valuep4 = periode.includes('P4');  
        console.log("10",valuep4);

        
        
            
            if((semestre==="S1")&&(valuep1)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant1,_userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        modifier1(element)
                        console.log(element);
                   }
                   })  
            }


            console.log("11");

        
            if((semestre==="S1")&&(valuep1)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant2,_userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        modifier1(element)
                        console.log(element);
                   }
                   })  
            }
        
        
        
        
                 
        
        

            if((semestre==="S1")&&(valuep2)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant1,_userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        modifier2(element)
                        console.log(element);
                   }
                   })
            
            
            }




            if((semestre==="S1")&&(valuep2)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant2,_userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        modifier2(element)
                        console.log(element);
                   }
                   })
            
            
            }



        
        
        
        
        



            
            if((semestre==="S2")&&(valuep3)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant1,_userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        modifier3(element)
                        console.log(element);
                   }
                   })
            
            
            }



  
            if((semestre==="S2")&&(valuep3)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant2,_userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        modifier3(element)
                        console.log(element);
                   }
                   })
            
            
            }












            if((semestre==="S2")&&(valuep4)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant1,_userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        modifier4(element)
                        console.log(element);
                   }
                   })
            
            
            }




            if((semestre==="S2")&&(valuep4)){

                enseignant.findOne(
                    {"nomenseignant":nomenseignant2,_userId:req.user_id 
                },
                   
                    
                     function( err,element){
            
            
                        if(err){
                            console.log(err);
                        }
                 
                    else{
                     
                        modifier4(element)
                        console.log(element);
                   }
                   })
            
            
            }


              
              
                    console.log(updatecomposant);
                    res.status(201).json(updatecomposant);
              
                } catch (error) {
                    res.status(422).json(error);
                }
              })















              function modifier1 (element){
              
                element.nbrcrenauxp1 = element.nbrcrenauxp1 + 1;
                  element.save();
                
              }  


              function modifier2 (element){
              
                element.nbrcrenauxp2 = element.nbrcrenauxp2 + 1;
              element.save();
                
              }  


              function modifier3 (element){
              
                element.nbrcrenauxp3 = element.nbrcrenauxp3 + 1;
              element.save();
                
              }  


              function modifier4 (element){
              
                element.nbrcrenauxp4 = element.nbrcrenauxp4 + 1;
              element.save();
                
              }  


















//////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////// increment crenaux /////////////////////////////////////////





router.put("/updatecrenaux", authenticate,  async(req, res) => { 

    console.log("bingooooooooiiiiiiiiiiiiii");
    
    
            try {
          
                const nomenseignant1=req.body.nomenseignant1;
                const nomenseignant2=req.body.nomenseignant2;
                const periode=req.body.periode;
                const semestre=req.body.semestre;

    
                const value1 = periode.find(v => v.includes('P1'));
                const value2 = periode.find(v => v.includes('P2'));  
              //  const value3 = periode.find(v => v.includes('P3'));  
             //   const value4 = periode.find(v => v.includes('P4'));  

    
                if((semestre==="S1")&& (value1)){
    
                    tableauhorraire.findOne(
                        {"nomenseignant":nomenseignant1, _userId:req.user_id 
                    },
                       
                        
                         function( err,element){
                
                
                            if(err){
                                console.log(err);
                            }
                     
                        else{
                         
                            updatenb1(element)
                            console.log(element);
                       }
                       })

                       ////////////


                       tableauhorraire.findOne(
                        {"nomenseignant":nomenseignant2, _userId:req.user_id 
                    },
                                           
                         function( err,element){
                
                
                            if(err){
                                console.log(err);
                            }
                     
                        else{
                         
                            updatenb1(element)
                            console.log(element);
                       }
                       })
                
                
                }


    
    
    
    
    
    
    
    
    
                
                if((semestre==="S1")&& (value2)){
    
                    tableauhorraire.findOne(
                        {"nomenseignant":nomenseignant1, _userId:req.user_id 
                    },
                       
                        
                         function( err,element){
                
                
                            if(err){
                                console.log(err);
                            }
                     
                        else{
                         
                            updatenb2(element)
                            console.log(element);
                       }
                       })

                
                       ////////////////////////

                       tableauhorraire.findOne(
                        {"nomenseignant":nomenseignant2,_userId:req.user_id 
                    },
                       
                        
                         function( err,element){
                
                
                            if(err){
                                console.log(err);
                            }
                     
                        else{
                         
                            updatenb2(element)
                            console.log(element);
                       }
                       })
                
                }
    













    
                if((semestre==="S2")&& (value1)){
    
                    tableauhorraire.findOne(
                        {"nomenseignant":nomenseignant1, _userId:req.user_id 
                    },
                       
                        
                         function( err,element){
                
                
                            if(err){
                                console.log(err);
                            }
                     
                        else{
                         
                            updatenb3(element)
                            console.log(element);
                       }
                       })


                       ////////////////////////////////////


                       tableauhorraire.findOne(
                        {"nomenseignant":nomenseignant2, _userId:req.user_id 
                    },
                       
                        
                         function( err,element){
                
                
                            if(err){
                                console.log(err);
                            }
                     
                        else{
                         
                            updatenb3(element)
                            console.log(element);
                       }
                       })
                
                
                }
    





    
                if((semestre==="S2")&& (value2)){
    
                    tableauhorraire.findOne(
                        {"nomenseignant":nomenseignant1,_userId:req.user_id 
                    },
                       
                        
                         function( err,element){
                
                
                            if(err){
                                console.log(err);
                            }
                     
                        else{
                         
                            updatenb4(element)
                            console.log(element);
                       }
                       })
                
                       //////////////////////////////////////////////


                       tableauhorraire.findOne(
                        {"nomenseignant":nomenseignant2, _userId:req.user_id 
                    },
                       
                        
                         function( err,element){
                
                
                            if(err){
                                console.log(err);
                            }
                     
                        else{
                         
                            updatenb4(element)
                            console.log(element);
                       }
                       })
                
                }
    
    
    
          
              
          
          
                console.log(updatecomposant);
                res.status(201).json(updatecomposant);
          
            } catch (error) {
                res.status(422).json(error);
            }
          })
          
    


          function updatenb1 (element){         
          element.nbrcrenauxp1 = element.nbrcrenauxp1 + 1;        
          element.p1 = element.p1 + 21;

          element.charges1 =  element.chargehorraire-(element.p1+element.p2);

          element.save();           
          } 
          

          function updatenb2 (element){         
            element.nbrcrenauxp2 = element.nbrcrenauxp2 + 1;
            element.p2 = element.p2 + 21;

            element.charges1 =  element.chargehorraire-(element.p1+element.p2);

            element.save();           
            } 
            
          

            
          function updatenb3 (element){         
            element.nbrcrenauxp3 = element.nbrcrenauxp3 + 1;
            element.p3 = element.p3 + 21;

            element.charges2 =  element.chargehorraire-(element.p3+element.p4);

            element.save();           
            } 
            


            function updatenb4 (element){         
                element.nbrcrenauxp4 = element.nbrcrenauxp4 + 1;
                element.p4 = element.p4 + 21;

                element.charges2 =  element.chargehorraire-(element.p3+element.p4);

                element.save();           
                } 
                
    


          //////////////////////////////////////////////////////////////////





          //////////////////////////////////////////  ////////////////////////////////////////////////













          router.put("/incrementecrenaux", authenticate,  async(req, res) => {

            console.log("bingooooooooiiiiiiiiiiiiii");
            
            
                    try {
                  
                        const nomenseignant1=req.body.nomenseignant1;
                        const nomenseignant2=req.body.nomenseignant2;
                        const periode=req.body.periode;
                        const semestre=req.body.semestre;

                  
            
                        const value1 = periode.find(v => v.includes('P1'));
                        const value2 = periode.find(v => v.includes('P2'));  
                    //    const value3 = periode.find(v => v.includes('P3'));  
                      //  const value4 = periode.find(v => v.includes('P4'));  
        
            
                      if((semestre==="S1")&& (value1)){
            
                            tableauhorraire.findOne(
                                {"nomenseignant":nomenseignant1, _userId:req.user_id 
                            },
                               
                                
                                 function( err,element){
                        
                        
                                    if(err){
                                        console.log(err);
                                    }
                             
                                else{
                                 
                                    mupdatenb1(element)
                                    console.log(element);
                               }
                               })
        
                               ////////////
        
        
                               tableauhorraire.findOne(
                                {"nomenseignant":nomenseignant2, _userId:req.user_id 
                            },
                                                   
                                 function( err,element){
                        
                        
                                    if(err){
                                        console.log(err);
                                    }
                             
                                else{
                                 
                                    mupdatenb1(element)
                                    console.log(element);
                               }
                               })
                        
                        
                        }
        
        
            
            
            
            
            
            
            
            
            
                        
                        if((semestre==="S1")&& (value2)){
            
                            tableauhorraire.findOne(
                                {"nomenseignant":nomenseignant1, _userId:req.user_id 
                            },
                               
                                
                                 function( err,element){
                        
                        
                                    if(err){
                                        console.log(err);
                                    }
                             
                                else{
                                 
                                    mupdatenb2(element)
                                    console.log(element);
                               }
                               })
        
                        
                               ////////////////////////
        
                               tableauhorraire.findOne(
                                {"nomenseignant":nomenseignant2,_userId:req.user_id 
                            },
                               
                                
                                 function( err,element){
                        
                        
                                    if(err){
                                        console.log(err);
                                    }
                             
                                else{
                                 
                                    mupdatenb2(element)
                                    console.log(element);
                               }
                               })
                        
                        }
            
        
        
        
        
        
        
        
        
        
        
        
        
        
            
                        if((semestre==="S2")&& (value1)){
            
                            tableauhorraire.findOne(
                                {"nomenseignant":nomenseignant1,       _userId:req.user_id 
                            },
                               
                                
                                 function( err,element){
                        
                        
                                    if(err){
                                        console.log(err);
                                    }
                             
                                else{
                                 
                                    mupdatenb3(element)
                                    console.log(element);
                               }
                               })
        
        
                               ////////////////////////////////////
        
        
                               tableauhorraire.findOne(
                                {"nomenseignant":nomenseignant2,       _userId:req.user_id 
                            },
                               
                                
                                 function( err,element){
                        
                        
                                    if(err){
                                        console.log(err);
                                    }
                             
                                else{
                                 
                                    mupdatenb3(element)
                                    console.log(element);
                               }
                               })
                        
                        
                        }
            
        
        
        
        
        
            
                        if((semestre==="S2")&& (value2)){
            
                            tableauhorraire.findOne(
                                {"nomenseignant":nomenseignant1, _userId:req.user_id 
                            },
                               
                                
                                 function( err,element){
                        
                        
                                    if(err){
                                        console.log(err);
                                    }
                             
                                else{
                                 
                                    mupdatenb4(element)
                                    console.log(element);
                               }
                               })
                        
                               //////////////////////////////////////////////
        
        
                               tableauhorraire.findOne(
                                {"nomenseignant":nomenseignant2,       _userId:req.user_id 
                            },
                               
                                
                                 function( err,element){
                        
                        
                                    if(err){
                                        console.log(err);
                                    }
                             
                                else{
                                 
                                    mupdatenb4(element)
                                    console.log(element);
                               }
                               })
                        
                        }
            
            
            
                  
                      
                  
                  
                        console.log(updatecomposant);
                        res.status(201).json(updatecomposant);
                  
                    } catch (error) {
                        res.status(422).json(error);
                    }
                  })
                  
            
        
        
                  function mupdatenb1 (element){         
                  element.nbrcrenauxp1 = element.nbrcrenauxp1 - 1;
                          
                  element.p1 = element.p1 - 21;

                  element.charges1 =  element.chargehorraire-(element.p1+element.p2);

                  element.save();           
                  } 
                  
        
                  function mupdatenb2 (element){         
                    element.nbrcrenauxp2 = element.nbrcrenauxp2 - 1;
                    element.p2 = element.p2 - 21;

                    element.charges1 =  element.chargehorraire-(element.p1+element.p2);

                    element.save();           
                    } 
                    
                  
        
                    
                  function mupdatenb3 (element){         
                    element.nbrcrenauxp3 = element.nbrcrenauxp3 - 1;
                    element.p3 = element.p3 - 21;

                    element.charges2 =  element.chargehorraire-(element.p2+element.p3);

                    element.save();           
                    } 
                    
        
        
                    function mupdatenb4 (element){         
                        element.nbrcrenauxp4 = element.nbrcrenauxp4 - 1;
                        element.p4 = element.p4 - 21;

                        element.charges2 =  element.chargehorraire-(element.p2+element.p3);

                        element.save();           
                        } 
                        
            
        
























  module.exports = router;