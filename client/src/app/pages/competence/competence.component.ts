import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Competence } from 'src/app/service/competence';
import { DialogcompetenceComponent } from '../dialogcompetence/dialogcompetence.component';

;

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']
})
export class CompetenceComponent implements OnInit {

  
  displayedColumns: string[] = ['nomcompetence','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  listecompetence: Competence[];

 

  constructor( private dialog : MatDialog,private api:ApiService,private router: Router) { }

  openDialog() {
    this.dialog.open(DialogcompetenceComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
    this.getAllCompetence();
      }
    })
  }


  getAllCompetence()
  {
    this.api.getCompetence().subscribe({
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



  deleteCompetence(_id:string, nomm: String){
    this.api.deleteCompetence(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllCompetence();
      }
    })




    
    console.log( this.listecompetence);
    



  
  }
  ngOnInit() {

    this.getAllCompetence();


    this.api.getCompetence().subscribe(
      (data: Competence[]) => {
         this.listecompetence = data;
      })



       
    

  }




  
editCompetence(row :any){
  this.dialog.open(DialogcompetenceComponent,{
    width: '30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val ==='update')
    {
      this.getAllCompetence();
    }
  })
  
}


changementDePage = function (nomcompetence) {

  this.router.navigate(['/'+nomcompetence]);





};


}


  
  

















  