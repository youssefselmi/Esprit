import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Enseignant } from 'src/app/service/enseignant';
import { Disponibilite } from 'src/app/service/disponibilite';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dialogdisponibilite',
  templateUrl: './dialogdisponibilite.component.html',
  styleUrls: ['./dialogdisponibilite.component.scss']
})
export class DialogdisponibiliteComponent implements OnInit {
  private readonly notifier: NotifierService;

  disponibiliteForm !: FormGroup;
  actionButton : string = "Save";
  listenseignant: Enseignant[];
  listdisponibilite: Disponibilite[];

  constructor(private formbuilder : FormBuilder, private api : ApiService,notifierService: NotifierService,
    private dialogRef : MatDialogRef<DialogdisponibiliteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) { }

  ngOnInit(): void {
    
    this.disponibiliteForm = this.formbuilder.group({
      nomenseignant: ['',Validators.required],
      periodes: ['',Validators.required],
      motif : ['',Validators.required],
    
      

       })
       if(this.editData){
        this.actionButton = "Update"
        
              this.disponibiliteForm.controls['nomenseignant'].setValue(this.editData.nomenseignant);
              this.disponibiliteForm.controls['periodes'].setValue(this.editData.periodes);
              this.disponibiliteForm.controls['motif'].setValue(this.editData.motif);
              
    
        
            }
            this.api.getEnseignant().subscribe(
              (data: Enseignant[]) => {
                 this.listenseignant = data;
              })
  }
  addDisponibilite(){

    if(!this.editData)
       {
          if(this.disponibiliteForm.valid){
    
            this.api.postDisponibilite(this.disponibiliteForm.value).subscribe({
              next:(res)=>{
                alert("disponibilite ajouté!!");
             //   this.notifier.notify('success', 'Classe Addes with Sucess');
                this.disponibiliteForm.reset();
                this.dialogRef.close('save');
              },
              error:()=>{
      
                alert("Error !!!!")
      
              }
            })
      
          }
       }
        else{
         this.updateDisponibilite();
        }
      
        
      }
      updateDisponibilite(){
       
        this.api.putDisponibilite(this.disponibiliteForm.value, this.editData._id)
        .subscribe({
          next:(res)=>{
            alert("Updated !!");
            this.disponibiliteForm.reset();
            this.dialogRef.close('update');
          }
        })

}

}