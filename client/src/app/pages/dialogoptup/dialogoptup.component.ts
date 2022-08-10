import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Enseignant } from 'src/app/service/enseignant';
import { Up } from 'src/app/service/up';
import { Optup } from 'src/app/service/optup';
import { ApiService } from 'src/app/service/api.service';




@Component({
  selector: 'app-dialogoptup',
  templateUrl: './dialogoptup.component.html',
  styleUrls: ['./dialogoptup.component.scss']
})
export class DialogoptupComponent implements OnInit {
  private readonly notifier: NotifierService;

  optupForm !: FormGroup;
  actionButton : string = "Save";
  listenseignant: Enseignant[];
  listup: Up[];

  constructor(private formbuilder : FormBuilder, private api : ApiService,notifierService: NotifierService,
    private dialogRef : MatDialogRef<DialogoptupComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) { }
   optup : Optup;

  ngOnInit(): void {

    



    this.optupForm = this.formbuilder.group({
      nomenseignant: ['',Validators.required],
      up: ['',Validators.required],
      periode : ['',Validators.required],
      creneaux : ['',Validators.required],
      

       })






       if(this.editData){
        this.actionButton = "Update"
        
              this.optupForm.controls['nomenseignant'].setValue(this.editData.nomenseignant);
              this.optupForm.controls['up'].setValue(this.editData.up);
              this.optupForm.controls['periode'].setValue(this.editData.periode);
              this.optupForm.controls['creneaux'].setValue(this.editData.creneaux);
              
    
        
            }
    
    
    
            
          this.api.getEnseignant().subscribe(
            (data: Enseignant[]) => {
               this.listenseignant = data;
            })
            this.api.getUp().subscribe(
              (data: Up[]) => {
                 this.listup = data;
              })
  }
  addOptup(){

    if(!this.editData)
       {
          if(this.optupForm.valid){
    
            this.api.postOptup(this.optupForm.value).subscribe({
              next:(res)=>{
                alert("optup ajouté!!");
             //   this.notifier.notify('success', 'Classe Addes with Sucess');
                this.optupForm.reset();
                this.dialogRef.close('save');
              },
              error:()=>{
      
                alert("Error !!!!")
      
              }
            })
      
          }
       }
        else{
         this.updateOptup();
        }
      
        
      }
      updateOptup(){
       
        this.api.putOptup(this.optupForm.value, this.editData._id)
        .subscribe({
          next:(res)=>{
            alert("Updated !!");
            this.optupForm.reset();
            this.dialogRef.close('update');
          }
        })
    
    
      }

}
