import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Affectation } from 'src/app/service/affectation';
import { ApiService } from 'src/app/service/api.service';
import { Classe } from 'src/app/service/classe';
import { DialogaffectationComponent } from '../dialogaffectation/dialogaffectation.component';
import { DialogclasseComponent } from '../dialogclasse/dialogclasse.component';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {


  displayedColumns: string[] = ['nomclasse','nomdepartement' ,'nommodules','semestre','periode','nomenseignant1','nomenseignant2','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  
  listaffectation: Affectation[];
  listeclasses : Classe[];

  constructor(private dialog : MatDialog,private api:ApiService) { }

  ngOnInit(): void {


    this.getAllAffectations();


    this.api.getAffectation().subscribe(
      (data: Affectation[]) => {

         this.listaffectation = data;
      })
    }



    getAllAffectations()
    {
      this.api.getAffectation().subscribe({
        next:(res)=>{
    
    
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    
             },
    
             error:(err)=>{
    
              alert("Error while fetching");
    
             }
      })
    }





    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  
  deleteAffectation(_id:string,nomenseignant1:string,nomenseignant2:string,periode:string,semestre:string){


///////////////////////////////////////////////// incrementer dans l enseignant lors de la suppression ///////////////////
    let datae1 = { 
      nomenseignant1:nomenseignant1, 
      nomenseignant2:nomenseignant2,
      semestre:semestre,
      periode:periode,
  } 

  console.log("pssssst "+datae1.nomenseignant1 +datae1.nomenseignant2+datae1.periode+datae1.semestre );


  this.api.incrementenseignant(datae1)
  .subscribe({
  
  })

/////////////////////////////////////////////////

///////////////////////////////////////////////// incrementer dans l le tableaux horraire lors de la suppression ///////////////////

let datae2 = { 
  nomenseignant1:nomenseignant1, 
  nomenseignant2:nomenseignant2,
  periode:periode,
  semestre:semestre,
} 

this.api.incrementnbcrenaux2(datae2)
.subscribe({

})












    ///////////////////////////////////////////////////
    this.api.deleteAffectation(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllAffectations();
      }
    })









    
  
  }







  
  editAffectation(row :any){
    this.dialog.open(DialogaffectationComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update')
      {
        this.getAllAffectations();
      }
    })
    
  }




 /* updateens(nomenseignant1:string,nomenseignant2:string,semestre:string,periode:string){


    let datae1 = { 
      nomenseignant1:nomenseignant1, 
      nomenseignant2:nomenseignant2,
      semestre:semestre,
      periode:periode,
  } 

  console.log("pssssst   "+datae1.nomenseignant1 +datae1.nomenseignant2+datae1.periode+datae1.semestre );


  this.api.incrementenseignant(datae1)
  .subscribe({
  
  })

  

  }*/







}



