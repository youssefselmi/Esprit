import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  departementForm !: FormGroup;
  actionButton : string = "Save";


  constructor(private formbuilder : FormBuilder, private api : ApiService,
    private dialogRef : MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) { }

  ngOnInit(): void {


    this.departementForm = this.formbuilder.group({
      nomdepartement : ['',Validators.required],
      location : ['',Validators.required],
      


    })




    if(this.editData){
      this.actionButton = "Update"
      
            this.departementForm.controls['nomdepartement'].setValue(this.editData.nomdepartement);
            this.departementForm.controls['location'].setValue(this.editData.location);
           
      
          }
  }



  addDepartement(){

if(!this.editData)
   {
      if(this.departementForm.valid){

        this.api.postProduct(this.departementForm.value).subscribe({
          next:(res)=>{
            alert("Departement added!!");
            this.departementForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
  
            alert("Error !!!!")
  
          }
        })
  
      }
   }
    else{
     this.updateDepartement();
    }
  
    
  }




  updateDepartement(){

    this.api.putDepartement(this.departementForm.value, this.editData._id)
    .subscribe({
      next:(res)=>{
        alert("Departement updated !!");
        this.departementForm.reset();
        this.dialogRef.close('update');
      }
    })


  }




}
