import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { Classe } from 'src/app/service/classe';
import { Departement } from 'src/app/service/departement';
import { Enseignant } from 'src/app/service/enseignant';
import { Module } from 'src/app/service/modulee';

@Component({
  selector: 'app-dialogaffectation',
  templateUrl: './dialogaffectation.component.html',
  styleUrls: ['./dialogaffectation.component.css']
})
export class DialogaffectationComponent implements OnInit {


  
  classeForm !: FormGroup;
  actionButton : string = "Save";
  listdepartement: Departement[];
  listModules: Module[];
  listenseignant :Enseignant[];
 


  nommodules = new FormControl('');



  constructor(private formbuilder : FormBuilder, private api : ApiService,
    private dialogRef : MatDialogRef<DialogaffectationComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) {

     // this.notifier = notifierService;

     }

    classe: Classe;

  ngOnInit(): void {


   
    this.classeForm = this.formbuilder.group({
      nomclasse: ['',Validators.minLength(4)],
    //  nbretudiant: ['',Validators.required],
      nomdepartement : ['',Validators.required],
      nommodules : ['',Validators.required],
      semestre : ['',Validators.required],
      periode : ['',Validators.required],

       })





 


  
  if(this.editData){
    this.actionButton = "Update"
    
          this.classeForm.controls['nomclasse'].setValue(this.editData.nomclasse);
        //  this.classeForm.controls['nbretudiant'].setValue(this.editData.nbretudiant);
          this.classeForm.controls['nomdepartement'].setValue(this.editData.nomdepartement);
          this.classeForm.controls['nommodules'].setValue(this.editData.nommodules);
          this.classeForm.controls['semestre'].setValue(this.editData.semestre);
          this.classeForm.controls['periode'].setValue(this.editData.periode);

    
        }



  ////////////// liste des departements      
      this.api.getDepartement().subscribe(
        (data: Departement[]) => {
           this.listdepartement = data;
        })
        //////// liste des enseignants
         var datae = { 
          nommodules:this.editData.nommodules, 
          semestre:this.editData.semestre,
          periode:this.editData.periode

      } 
      
      //console.log(datae);
      
       
      this.api.getEnseignantss(datae).subscribe(
         (data:any) => {
             this.listenseignant = data;
             console.log(this.listenseignant);
          } )
        // console.log(this.classeForm.value);

  




  ////////// liste des modules//////////////          
      this.api.getModule().subscribe(
        (data: Module[]) => {
           this.listModules = data;
        })

}





addClasse(){

  if(!this.editData)
     {
        if(this.classeForm.valid){
  
          this.api.postAffectation(this.classeForm.value).subscribe({
            next:(res)=>{
              alert("Classe added!!");
           //   this.notifier.notify('success', 'Classe Addes with Sucess');
              this.classeForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
    
              alert("Error !!!!")
    
            }
          })
    
        }
     }
      else{
       this.updateClasse();
      }
    
      
    }




    updateClasse(){

      this.api.putAffectation(this.classeForm.value, this.editData._id)
      .subscribe({
        next:(res)=>{
          alert("Classe updated !!");
          this.classeForm.reset();
          this.dialogRef.close('update');
        }
      })
  
  
    }






}