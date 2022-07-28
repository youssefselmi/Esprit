import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Enseignant } from 'src/app/service/enseignant';

import { ApiService } from 'src/app/service/api.service';
import { Competence } from 'src/app/service/competence';

@Component({
  selector: 'app-dialogenseignant',
  templateUrl: './dialogenseignant.component.html',
  styleUrls: ['./dialogenseignant.component.scss']
})
export class DialogenseignantComponent implements OnInit {

  private readonly notifier: NotifierService;

  enseignantForm !: FormGroup;
  actionButton : string = "Save";
  listecompetence: Competence[];

  constructor(private formbuilder : FormBuilder, private api : ApiService,notifierService: NotifierService,
    private dialogRef : MatDialogRef<DialogenseignantComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) {

     // this.notifier = notifierService;
}
enseignant :Enseignant;

  ngOnInit(): void {



    this.enseignantForm = this.formbuilder.group({
      nomenseignant: ['',Validators.required],
      email: ['',Validators.required],
      password : ['',Validators.required],
      competence : ['',Validators.required],

       })






       if(this.editData){
        this.actionButton = "Update"
        
              this.enseignantForm.controls['nomenseignant'].setValue(this.editData.nomenseignant);
              this.enseignantForm.controls['email'].setValue(this.editData.email);
              this.enseignantForm.controls['password'].setValue(this.editData.password);
              this.enseignantForm.controls['competence'].setValue(this.editData.competence);
    
        
            }
    
    
    
            
          this.api.getCompetence().subscribe(
            (data: Competence[]) => {
               this.listecompetence = data;
            })

  }
  addEnseignant(){

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
      
              }
            })
      
          }
       }
        else{
         this.updateEnseignant();
        }
      
        
      }
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
