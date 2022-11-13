import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { Classe } from 'src/app/service/classe';
import { Departement } from 'src/app/service/departement';
import { NotifierService } from 'angular-notifier';
import { Module } from 'src/app/service/modulee';

@Component({
  selector: 'app-dialogclasse',
  templateUrl: './dialogclasse.component.html',
  styleUrls: ['./dialogclasse.component.css']
})
export class DialogclasseComponent implements OnInit {
  private readonly notifier: NotifierService;

  classeForm !: FormGroup;
  actionButton : string = "Save";
  listdepartement: Departement[];
  listModules: Module[];



  nommodules = new FormControl('');



  constructor(private formbuilder : FormBuilder, private api : ApiService,notifierService: NotifierService,
    private dialogRef : MatDialogRef<DialogclasseComponent>,
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
      nombreclasses : ['',Validators.required],
      nommodules : ['',Validators.required],
      semestre : ['',Validators.required],
      periode : ['',Validators.required],
      nbreenseignant:['',Validators.required],
      nomenseignant1:['',],
      nomenseignant2:['',],
      anneuni : ['',Validators.required],

       })





 


  
  if(this.editData){
    this.actionButton = "Update"
    
          this.classeForm.controls['nomclasse'].setValue(this.editData.nomclasse);
        //  this.classeForm.controls['nbretudiant'].setValue(this.editData.nbretudiant);
          this.classeForm.controls['nomdepartement'].setValue(this.editData.nomdepartement);
          this.classeForm.controls['nombreclasses'].setValue(this.editData.nombreclasses);
          this.classeForm.controls['nommodules'].setValue(this.editData.nommodules);
          this.classeForm.controls['semestre'].setValue(this.editData.semestre);
          this.classeForm.controls['periode'].setValue(this.editData.periode);
          this.classeForm.controls['nbreenseignant'].setValue(this.editData.nbreenseignant);
          this.classeForm.controls['nomenseignant1'].setValue(this.editData.nomenseignant1);
          this.classeForm.controls['nomenseignant2'].setValue(this.editData.nomenseignant2);
          this.classeForm.controls['anneuni'].setValue(this.editData.anneuni);

    
        }



  ////////////// liste des departements      
      this.api.getDepartement().subscribe(
        (data: Departement[]) => {
           this.listdepartement = data;
        })
  



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
  
          this.api.postClasse(this.classeForm.value).subscribe({
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

      this.api.putClasse(this.classeForm.value, this.editData._id)
      .subscribe({
        next:(res)=>{
          alert("Classe updated !!");
          this.classeForm.reset();
          this.dialogRef.close('update');
        }
      })
  
  
    }






}