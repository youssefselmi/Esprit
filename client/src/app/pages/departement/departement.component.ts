import { Component, OnInit, OnDestroy,Input,Output,EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Departement } from 'src/app/service/departement';
import { Router } from '@angular/router';
import { Classe } from 'src/app/service/classe';



@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {


  displayedColumns: string[] = ['nomdepartement', 'location' ,'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  listdep: Departement[];
  listeclasses : Classe[];
  nom : String;


  //@Input() bevergeas = "tea";


 

  constructor( private dialog : MatDialog,private api:ApiService,private api2:ApiService,private router: Router) { }









  openDialog() {
    this.dialog.open(DialogComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllDepartement();
      }
    })
  }


  getAllDepartement()
  {
    this.api.getDepartement().subscribe({
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



  deleteDepartement(_id:string,nomdep:String){


    
    if(confirm("Are you sure to delete "+nomdep)) {

    this.api.deleteDepartement(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllDepartement();


      }
    })

  }


      console.log( this.listeclasses);
      for (let index = 0; index < this.listeclasses.length; index++) {
        if(this.listeclasses[index].nomdepartement==nomdep)
        {
          
            
          this.api2.deleteClasse(this.listeclasses[index]._id).subscribe({
            next:(res)=>{ } })
            alert("Les Classes de département  "+nomdep+"  vont etre supprimé automatiquement");

          }

       
      }






      
  
  }
  
  







  ngOnInit() {

    this.getAllDepartement();


    this.api.getDepartement().subscribe(
      (data: Departement[]) => {
         this.listdep = data;
      })


      
   
    this.api2.getClasse().subscribe(
      (data: Classe[]) => {
         this.listeclasses = data;
      })



  }




  
editDepartement(row :any){
  this.dialog.open(DialogComponent,{
    width: '30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val ==='update')
    {
      this.getAllDepartement();
    }
  })
  
}




changementDePage = function (nomdep) {

 /*if(nomdep=='informatique')
{this.router.navigate(['/informatique']);}

else if(nomdep=='mecanique'){
  this.router.navigate(['/mecanique']);
}

else if(nomdep=='mecatronique'){
  this.router.navigate(['/mecatronique']);
}

else if(nomdep=='telecommunication'){
  this.router.navigate(['/telecommunication']);
}*/

this.router.navigate(['/'+nomdep]);


};



}



