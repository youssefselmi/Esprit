import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Module } from 'src/app/service/modulee';

import { ApiService } from 'src/app/service/api.service';
import { Up } from 'src/app/service/up';

@Component({
  selector: 'app-dialogmodule',
  templateUrl: './dialogmodule.component.html',
  styleUrls: ['./dialogmodule.component.css']
})
export class DialogmoduleComponent implements OnInit {

  private readonly notifier: NotifierService;

  moduleForm !: FormGroup;
  actionButton : string = "Save";
  listeup: Up[];


  constructor(private formbuilder : FormBuilder, private api : ApiService,notifierService: NotifierService,
    private dialogRef : MatDialogRef<DialogmoduleComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) {

     // this.notifier = notifierService;

     }

    module: Module;

  ngOnInit(): void {

   
   
    this.moduleForm = this.formbuilder.group({
      nommodule: ['',Validators.required],
      coefficient: ['',Validators.required],
      nbrheures : ['',Validators.required],
      attribut : ['',Validators.required],
      nomup : ['',Validators.required],

       })





 


  
  if(this.editData){
    this.actionButton = "Update"
    
          this.moduleForm.controls['nommodule'].setValue(this.editData.nommodule);
          this.moduleForm.controls['coefficient'].setValue(this.editData.coefficient);
          this.moduleForm.controls['nbrheures'].setValue(this.editData.nbrheures);
          this.moduleForm.controls['attribut'].setValue(this.editData.attribut);
          this.moduleForm.controls['nomup'].setValue(this.editData.nomup);

    
        }



        
      this.api.getUp().subscribe(
        (data: Up[]) => {
           this.listeup = data;
        })
  

}





addModule(){

  if(!this.editData)
     {
        if(this.moduleForm.valid){
  
          this.api.postModule(this.moduleForm.value).subscribe({
            next:(res)=>{
              alert("Module added!!");
           //   this.notifier.notify('success', 'Classe Addes with Sucess');
              this.moduleForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
    
              alert("Error !!!!")
    
            }
          })
    
        }
     }
      else{
       this.updateModule();
      }
    
      
    }




    updateModule(){

      this.api.putModule(this.moduleForm.value, this.editData._id)
      .subscribe({
        next:(res)=>{
          alert("Module updated !!");
          this.moduleForm.reset();
          this.dialogRef.close('update');
        }
      })
  
  
    }






}