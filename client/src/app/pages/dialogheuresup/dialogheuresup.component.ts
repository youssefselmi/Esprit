import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Enseignant } from 'src/app/service/enseignant';
import { Heuresup } from 'src/app/service/heuresup';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dialogheuresup',
  templateUrl: './dialogheuresup.component.html',
  styleUrls: ['./dialogheuresup.component.scss']
})
export class DialogheuresupComponent implements OnInit  {
  private readonly notifier: NotifierService;

  heuresupForm !: FormGroup;
  actionButton : string = "Save";
  listenseignant: Enseignant[];
  listheuresup: Heuresup[];

  constructor(private formbuilder : FormBuilder, private api : ApiService,notifierService: NotifierService,
    private dialogRef : MatDialogRef<DialogheuresupComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) { }

  ngOnInit(): void {
    
    this.heuresupForm = this.formbuilder.group({
      nomenseignant: ['',Validators.required],
      periodes: ['',Validators.required],
      nbreheures : ['',Validators.required],
    
      

       })
       if(this.editData){
        this.actionButton = "Update"
        
              this.heuresupForm.controls['nomenseignant'].setValue(this.editData.nomenseignant);
              this.heuresupForm.controls['periodes'].setValue(this.editData.periodes);
              this.heuresupForm.controls['nbreheures'].setValue(this.editData.motif);
              
    
        
            }
            this.api.getEnseignant().subscribe(
              (data: Enseignant[]) => {
                 this.listenseignant = data;
              })
  }
  addHeuresup(){

    if(!this.editData)
       {
          if(this.heuresupForm.valid){
    
            this.api.postHeuresup(this.heuresupForm.value).subscribe({
              next:(res)=>{
                alert("heure sup ajouté!!");
             //   this.notifier.notify('success', 'Classe Addes with Sucess');
                this.heuresupForm.reset();
                this.dialogRef.close('save');
              },
              error:()=>{
      
                alert("Error !!!!")
      
              }
            })
      
          }
       }
        else{
         this.updateHeuresup();
        }
      
        
      }
      updateHeuresup(){
       
        this.api.putDisponibilite(this.heuresupForm.value, this.editData._id)
        .subscribe({
          next:(res)=>{
            alert("Updated !!");
            this.heuresupForm.reset();
            this.dialogRef.close('update');
          }
        })

}

}