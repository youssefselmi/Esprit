import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Departement } from 'src/app/service/departement';


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



  constructor( private dialog : MatDialog,private api:ApiService) { }

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



  deleteDepartement(_id:string){
    this.api.deleteDepartement(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllDepartement();
      }
    })
  
  }
  
  







  ngOnInit() {

    this.getAllDepartement();


    this.api.getDepartement().subscribe(
      (data: Departement[]) => {
         this.listdep = data;
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


}



