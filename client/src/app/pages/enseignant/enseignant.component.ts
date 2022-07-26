import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Enseignant } from 'src/app/service/enseignant';

import { Competence } from 'src/app/service/competence';
import { ApiService } from 'src/app/service/api.service';
import { DialogenseignantComponent } from  '../dialogenseignant/dialogenseignant.component';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss']
})
export class EnseignantComponent implements OnInit { 
  displayedColumns: string[] = ['nomenseignant', 'email','password' ,'competence','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  listenseignant: Enseignant[];
  listcompetence: Competence[];


  constructor(private dialog : MatDialog,private api:ApiService) { }


  openDialog() {
    this.dialog.open(DialogenseignantComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
       this.getAllEnseignants();
      }
    })
  }
  getAllEnseignants()
  {
    this.api.getEnseignant().subscribe({
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


  deleteEnseignant(_id:string){
    this.api.deleteEnseignant(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllEnseignants();
      }
    })
  
  }






  ngOnInit(): void {
    this.getAllEnseignants();


    this.api.getEnseignant().subscribe(
      (data: Enseignant[]) => {
         this.listenseignant = data;
      })


      this.api.getCompetence().subscribe(
        (data: Competence[]) => {
           this.listcompetence = data;
        })
  }
  editEnseignant(row :any){
    this.dialog.open(DialogenseignantComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update')
      {
        this.getAllEnseignants();
      }
    })
    
  }

}
