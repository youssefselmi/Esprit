import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Type } from 'src/app/service/type';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dialogtype',
  templateUrl: './dialogtype.component.html',
  styleUrls: ['./dialogtype.component.scss']
})
export class DialogtypeComponent implements OnInit {
  private readonly notifier: NotifierService;

  typeForm !: FormGroup;
  actionButton : string = "Save";
  listetype: Type[];
  
  constructor(private formbuilder : FormBuilder, private api : ApiService,notifierService: NotifierService,
    private dialogRef : MatDialogRef<DialogtypeComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) { }
  ngOnInit(): void {
    this.typeForm = this.formbuilder.group({
      typeenseignement: ['',Validators.required],
      nbreheures: ['',Validators.required],
      
      

       })
       if(this.editData){
        this.actionButton = "Update"
        
              this.typeForm.controls['typeenseignement'].setValue(this.editData.typeenseignement);
              this.typeForm.controls['nbreheures'].setValue(this.editData.nbreheures);
            
        
            }
            this.api.getType().subscribe(
              (data: Type[]) => {
                 this.listetype = data;
              })
  }
  addType(){

    if(!this.editData)
       {
          if(this.typeForm.valid){
    
            this.api.postType(this.typeForm.value).subscribe({
              next:(res)=>{
                alert("type ajouté!!");
             //   this.notifier.notify('success', 'Classe Addes with Sucess');
                this.typeForm.reset();
                this.dialogRef.close('save');
              },
              error:()=>{
      
                alert("Error !!!!")
      
              }
            })
      
          }
       }
        else{
         this.updateType();
        }
      
        
      }
      updateType(){
       
        this.api.putType(this.typeForm.value, this.editData._id)
        .subscribe({
          next:(res)=>{
            alert("Updated !!");
            this.typeForm.reset();
            this.dialogRef.close('update');
          }
        })

}

}
