import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Enseignant } from 'src/app/service/enseignant';

import { ApiService } from 'src/app/service/api.service';
import { Competence } from 'src/app/service/competence';
import { Type } from 'src/app/service/type';
import { AffectationTableauCHComponent } from '../affectation-tableau-ch/affectation-tableau-ch.component';
import { AffectationTablleHorraire } from 'src/app/service/affectationTableauxChargeHorraire';



interface NombreCrenaux {
  value: number;
  viewValue: number;
}



interface NombreCrenaux2 {
  value2: number;
  viewValue2: number;
}


interface NombreCrenaux3 {
  value3: number;
  viewValue3: number;
}


interface NombreCrenaux4 {
  value4: number;
  viewValue4: number;
}



@Component({
  selector: 'app-dialogenseignant',
  templateUrl: './dialogenseignant.component.html',
  styleUrls: ['./dialogenseignant.component.scss']
})
export class DialogenseignantComponent implements OnInit {

  private readonly notifier: NotifierService;

  enseignant: Enseignant;

  affectation: AffectationTablleHorraire;
  affectation2: AffectationTablleHorraire;


  enseignantForm !: FormGroup;
  actionButton : string = "Save";
  listecompetence: Competence[];
  listeType: Type[];



  selectedValue:  number;
  selectedValue2: number;
  selectedValue3: number;
  selectedValue4: number;


  

  nombrecrenaux: NombreCrenaux[] = [
  //  {value: 0, viewValue: 0},
  //  {value: 1, viewValue: 1},
  //  {value: 2, viewValue: 2},
    {value: 3, viewValue: 3},
    {value: 4, viewValue: 4},
    {value: 5, viewValue: 5},
    {value: 6, viewValue: 6},

  ];

  nombrecrenaux2: NombreCrenaux2[] = [
  //  {value2: 0, viewValue2: 0},
   // {value2: 1, viewValue2: 1},
   // {value2: 2, viewValue2: 2},
    {value2: 3, viewValue2: 3},
    {value2: 4, viewValue2: 4},
    {value2: 5, viewValue2: 5},
    {value2: 6, viewValue2: 6},

  ];

  nombrecrenaux3: NombreCrenaux3[] = [
 //   {value3: 0, viewValue3: 0},
   // {value3: 1, viewValue3: 1},
   // {value3: 2, viewValue3: 2},
    {value3: 3, viewValue3: 3},
    {value3: 4, viewValue3: 4},
    {value3: 5, viewValue3: 5},
    {value3: 6, viewValue3: 6},

  ];

  nombrecrenaux4: NombreCrenaux4[] = [
   // {value4: 0, viewValue4: 0},
   // {value4: 1, viewValue4: 1},
   // {value4: 2, viewValue4: 2},
    {value4: 3, viewValue4: 3},
    {value4: 4, viewValue4: 4},
    {value4: 5, viewValue4: 5},
    {value4: 6, viewValue4: 6},

  ];









  constructor(private formbuilder : FormBuilder, private api : ApiService,notifierService: NotifierService,
    private dialogRef : MatDialogRef<DialogenseignantComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) {

     // this.notifier = notifierService;
}

nom : string;
type : string;
nbrcrenaux1 : Number;
nbrcrenaux2 : Number;
nbrcrenaux3 : Number;
nbrcrenaux4 : Number;
chargehorraire : Number;
password : string;

p1 : Number;
p2 : Number;
p3 : Number;
p4 : Number;

ngOnInit(): void {

  this.enseignant =  new Enseignant();
  this.affectation =  new AffectationTablleHorraire();

  this.affectation2 =  new AffectationTablleHorraire();



    this.enseignantForm = this.formbuilder.group({
      nomenseignant: ['',Validators.required],
      email: ['',Validators.required],
      nomcompetence : ['',Validators.required],
      type : ['',Validators.required],
      nbrcrenauxp1 : ['',Validators.required],
      nbrcrenauxp2 : ['',Validators.required],
      nbrcrenauxp3 : ['',Validators.required],
      nbrcrenauxp4 : ['',Validators.required],
      daterecrutement : ['',Validators.required],
      datesortie : ['',],
       })


       if(this.editData){
        this.actionButton = "Update"
        
              this.enseignantForm.controls['nomenseignant'].setValue(this.editData.nomenseignant);
              this.enseignantForm.controls['email'].setValue(this.editData.email);
              this.enseignantForm.controls['nomcompetence'].setValue(this.editData.nomcompetence);;
              this.enseignantForm.controls['type'].setValue(this.editData.type);
              this.enseignantForm.controls['nbrcrenauxp1'].setValue(this.editData.nbrcrenauxp1);
              this.enseignantForm.controls['nbrcrenauxp2'].setValue(this.editData.nbrcrenauxp2);
              this.enseignantForm.controls['nbrcrenauxp3'].setValue(this.editData.nbrcrenauxp3);
              this.enseignantForm.controls['nbrcrenauxp4'].setValue(this.editData.nbrcrenauxp4);
              this.enseignantForm.controls['daterecrutement'].setValue(this.editData.daterecrutement);
              this.enseignantForm.controls['datesortie'].setValue(this.editData.datesortie);


        
            }
    
    
    
            
          this.api.getCompetence().subscribe(
            (data: Competence[]) => {
               this.listecompetence = data;
            })


            this.api.getType().subscribe(
              (data: Type[]) => {
                 this.listeType = data;
              })

  }



  addEnseignant(nom,type,nbrcrenaux1,nbrcrenaux2,nbrcrenaux3,nbrcrenaux4){

    if(!this.editData)
       {
          if(this.enseignantForm.valid){
    
            this.api.postEnseignant(this.enseignantForm.value).subscribe({
              next:(res)=>{
                alert("Enseignant ajouté!!");
             //   this.notifier.notify('success', 'Classe Addes with Sucess');
                this.enseignantForm.reset();
                this.dialogRef.close('save');
              },
              error:()=>{
      
                alert("Error !!!!")
      
              },
              
              
            })


            this.api.getType().subscribe(
              (data: Type[]) => {
                 this.listeType = data;
              })


              for (let index = 0; index < this.listeType.length; index++) {

                if(this.listeType[index].typeenseignement==type)
                {
                  this.chargehorraire=this.listeType[index].nbreheures;

                }
              }

            this.p1=nbrcrenaux1*21;
            this.p2=nbrcrenaux2*21;
            this.p3=nbrcrenaux3*21;
            this.p4=nbrcrenaux4*21;

            this.password="lqldsdk5qsd";
            this.affectation.nomenseignant=nom;
            this.affectation.type=type;
            this.affectation.chargehorraire=this.chargehorraire;
            this.affectation.nbrcrenauxp1=nbrcrenaux1;
            this.affectation.nbrcrenauxp2=nbrcrenaux2;
            this.affectation.nbrcrenauxp3=nbrcrenaux3;
            this.affectation.nbrcrenauxp4=nbrcrenaux4;
            this.affectation.p1=this.p1;
            this.affectation.p2=this.p2;
            this.affectation.p3=this.p3;
            this.affectation.p4=this.p4;

        


            this.password="lqldsdk5qsd";
            this.affectation2.nomenseignant="pas d'ensiegnat";
            this.affectation2.type=type;
            this.affectation2.chargehorraire=this.chargehorraire;
            this.affectation2.nbrcrenauxp1=10000;
            this.affectation2.nbrcrenauxp2=10000;
            this.affectation2.nbrcrenauxp3=10000;
            this.affectation2.nbrcrenauxp4=10000;
            this.affectation2.p1=this.p1;
            this.affectation2.p2=this.p2;
            this.affectation2.p3=this.p3;
            this.affectation2.p4=this.p4;

        



            this.api.postAffectationTH(this.affectation).subscribe({
     
            })




            
            this.api.postAffectationTH(this.affectation2).subscribe({
     
            })

      
          }
       }
        else{
         this.updateEnseignant();
        }

      }



        ////////////////////////////////////////////////
      










      updateEnseignant(){

        this.api.putEnseignant(this.enseignantForm.value, this.editData._id)
        .subscribe({
          next:(res)=>{
            alert("Updated !!");
            this.enseignantForm.reset();
            this.dialogRef.close('update');
          }
        })
    
    
      }

}
