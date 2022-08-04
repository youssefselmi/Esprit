import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';






interface NombreCrenaux {
  value: number;
  viewValue: number;
}



interface NombreCrenaux2 {
  value2: number;
  viewValue2: number;
}


interface NombreCrenaux3 {
  value3: number;
  viewValue3: number;
}


interface NombreCrenaux4 {
  value4: number;
  viewValue4: number;
}














@Component({
  selector: 'app-dialogaffectation-tableau-ch',
  templateUrl: './dialogaffectation-tableau-ch.component.html',
  styleUrls: ['./dialogaffectation-tableau-ch.component.css']
})
export class DialogaffectationTableauCHComponent implements OnInit {

  AffectationTHForm !: FormGroup;
  actionButton : string = "Save";


  selectedValue:  number;
  selectedValue2: number;
  selectedValue3: number;
  selectedValue4: number;





  nombrecrenaux: NombreCrenaux[] = [
    {value: 0, viewValue: 0},
    {value: 1, viewValue: 1},
    {value: 2, viewValue: 2},
    {value: 3, viewValue: 3},
    {value: 4, viewValue: 4},
    {value: 5, viewValue: 5},
  ];

  nombrecrenaux2: NombreCrenaux2[] = [
    {value2: 0, viewValue2: 0},
    {value2: 1, viewValue2: 1},
    {value2: 2, viewValue2: 2},
    {value2: 3, viewValue2: 3},
    {value2: 4, viewValue2: 4},
    {value2: 5, viewValue2: 5},
  ];

  nombrecrenaux3: NombreCrenaux3[] = [
    {value3: 0, viewValue3: 0},
    {value3: 1, viewValue3: 1},
    {value3: 2, viewValue3: 2},
    {value3: 3, viewValue3: 3},
    {value3: 4, viewValue3: 4},
    {value3: 5, viewValue3: 5},
  ];

  nombrecrenaux4: NombreCrenaux4[] = [
    {value4: 0, viewValue4: 0},
    {value4: 1, viewValue4: 1},
    {value4: 2, viewValue4: 2},
    {value4: 3, viewValue4: 3},
    {value4: 4, viewValue4: 4},
    {value4: 5, viewValue4: 5},
  ];

 




  constructor(private formbuilder : FormBuilder, private api : ApiService,
    private dialogRef : MatDialogRef<DialogaffectationTableauCHComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ) {

     // this.notifier = notifierService;

     }

    //classe: Classe;

  ngOnInit(): void {


   
    this.AffectationTHForm = this.formbuilder.group({


      nomenseignant: ['',Validators.minLength(4)],
      type : ['',Validators.required],
      chargehorraire : ['',Validators.required],
      nbrcrenauxp1 : ['',Validators.required],
      nbrcrenauxp2 : ['',Validators.required],
      nbrcrenauxp3 : ['',Validators.required],
      nbrcrenauxp4 : ['',Validators.required],
      p1 : ['',Validators.required],
      p2 : ['',Validators.required],
      p3 : ['',Validators.required],
      p4 : ['',Validators.required],

       })





 


  
  if(this.editData){
    this.actionButton = "Update"
    
          this.AffectationTHForm.controls['nomenseignant'].setValue(this.editData.nomenseignant);
        //  this.classeForm.controls['nbretudiant'].setValue(this.editData.nbretudiant);
          this.AffectationTHForm.controls['type'].setValue(this.editData.type);
          this.AffectationTHForm.controls['chargehorraire'].setValue(this.editData.chargehorraire);
          this.AffectationTHForm.controls['nbrcrenauxp1'].setValue(this.editData.nbrcrenauxp1);
          this.AffectationTHForm.controls['nbrcrenauxp2'].setValue(this.editData.nbrcrenauxp2);
          this.AffectationTHForm.controls['nbrcrenauxp3'].setValue(this.editData.nbrcrenauxp3);
          this.AffectationTHForm.controls['nbrcrenauxp4'].setValue(this.editData.nbrcrenauxp4);


          this.AffectationTHForm.controls['p1'].setValue(this.editData.p1);
          this.AffectationTHForm.controls['p2'].setValue(this.editData.p2);
          this.AffectationTHForm.controls['p3'].setValue(this.editData.p3);
          this.AffectationTHForm.controls['p4'].setValue(this.editData.p4);


    
        }






}





addAffectation(){

  if(!this.editData)
     {
        if(this.AffectationTHForm.valid){
  
          this.api.postAffectationTH(this.AffectationTHForm.value).subscribe({
            next:(res)=>{
              alert("Affectation added!!");
           //   this.notifier.notify('success', 'Classe Addes with Sucess');
              this.AffectationTHForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
    
              alert("Error !!!!")
    
            }
          })
    
        }
     }
      else{
       this.updateAffectation();
      }
    
      
    }




    updateAffectation(){

      this.api.putAffectationTH(this.AffectationTHForm.value, this.editData._id)
      .subscribe({
        next:(res)=>{
          alert("Classe updated !!");
          this.AffectationTHForm.reset();
          this.dialogRef.close('update');
        }
      })
  
  
    }






}