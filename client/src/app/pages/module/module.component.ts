import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Module } from 'src/app/service/modulee';

import { ApiService } from 'src/app/service/api.service';
import { Up } from 'src/app/service/up';
import { DialogmoduleComponent } from '../dialogmodule/dialogmodule.component';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  displayedColumns: string[] = ['nommodule', 'coefficient','nbrheures' ,'nomup','nomcompetence','actions',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  listmodule: Module[];
  listup: Up[];


  constructor( private dialog : MatDialog,private api:ApiService) { }


  openDialog() {
    this.dialog.open(DialogmoduleComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
       this.getAllmodules();
      }
    })
  }




  getAllmodules()
  {
    this.api.getModule().subscribe({
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



  
  deleteModule(_id:string){
    this.api.deleteModule(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllmodules();
      }
    })
  
  }
  
  







  ngOnInit(): void {

    this.getAllmodules();


    this.api.getModule().subscribe(
      (data: Module[]) => {
         this.listmodule = data;
      })


      this.api.getUp().subscribe(
        (data: Up[]) => {
           this.listup = data;
        })

  }



  editModule(row :any){
    this.dialog.open(DialogmoduleComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update')
      {
        this.getAllmodules();
      }
    })
    
  }
  

}
