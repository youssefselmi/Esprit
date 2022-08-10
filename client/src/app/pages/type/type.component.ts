import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Type } from 'src/app/service/type';

import { ApiService } from 'src/app/service/api.service';
import { DialogtypeComponent } from  '../dialogtype/dialogtype.component';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  displayedColumns: string[] = ['typeenseignement', 'nbreheures','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listtype: Type[];
  

  constructor(private dialog : MatDialog,private api:ApiService) { }
  openDialog() {
    this.dialog.open(DialogtypeComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
       this.getAlltypes();
      }
    })
  }
  getAlltypes()
  {
    this.api.getType().subscribe({
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
  deletetype(_id:string){
    this.api.deleteType(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAlltypes();
      }
    })
  
  }
  ngOnInit(): void {
    this.getAlltypes();


    this.api.getType().subscribe(
      (data: Type[]) => {
         this.listtype = data;
      })
  }
  edittype(row :any){
    this.dialog.open(DialogtypeComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update')
      {
        this.getAlltypes();
      }
    })
    
  }

}
