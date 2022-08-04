import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dialogcompetence',
  templateUrl: './dialogcompetence.component.html',
  styleUrls: ['./dialogcompetence.component.scss']
})
export class DialogcompetenceComponent implements OnInit {
  
  competenceForm !: FormGroup;
  actionButton : string = "Save";

  constructor(private formbuilder : FormBuilder, private api : ApiService,
    private dialogRef : MatDialogRef<DialogcompetenceComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) { }

  ngOnInit(): void {


    this.competenceForm = this.formbuilder.group({
      nomcompetence : ['',Validators.required],
      


    })





 
  


  




    if(this.editData){
      this.actionButton = "Update"
      
            this.competenceForm.controls['nomcompetence'].setValue(this.editData.nomcompetence);
           
      
          }
  }



  addCompetence(){

if(!this.editData)
   {
      if(this.competenceForm.valid){

        this.api.postCompetence(this.competenceForm.value).subscribe({
          next:(res)=>{
            alert("Competence added!!");
            this.competenceForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
  
            alert("Error !!!!")
  
          }
        })
  
      }
   }
    else{
     this.updateCompetence();
    }
  
    
  }




  updateCompetence(){

    this.api.putCompetence(this.competenceForm.value, this.editData._id)
    .subscribe({
      next:(res)=>{
        alert("Competence updated !!");
        this.competenceForm.reset();
        this.dialogRef.close('update');
      }
    })


  }




}

