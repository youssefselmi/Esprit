import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dialogup',
  templateUrl: './dialogup.component.html',
  styleUrls: ['./dialogup.component.css']
})
export class DialogupComponent implements OnInit {

 
  upForm !: FormGroup;
  actionButton : string = "Save";


  constructor(private formbuilder : FormBuilder, private api : ApiService,
    private dialogRef : MatDialogRef<DialogupComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) { }

  ngOnInit(): void {


    this.upForm = this.formbuilder.group({
      nomup : ['',Validators.required],
      


    })




    if(this.editData){
      this.actionButton = "Update"
      
            this.upForm.controls['nomup'].setValue(this.editData.nomup);
           
      
          }
  }



  addUp(){

if(!this.editData)
   {
      if(this.upForm.valid){

        this.api.postUp(this.upForm.value).subscribe({
          next:(res)=>{
            alert("Unité pédagogique added!!");
            this.upForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
  
            alert("Error !!!!")
  
          }
        })
  
      }
   }
    else{
     this.updateUp();
    }
  
    
  }




  updateUp(){

    this.api.putUp(this.upForm.value, this.editData._id)
    .subscribe({
      next:(res)=>{
        alert("Unité Pédagogique updated !!");
        this.upForm.reset();
        this.dialogRef.close('update');
      }
    })


  }




}
