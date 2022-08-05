import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Optup } from 'src/app/service/optup';
import { Enseignant } from 'src/app/service/enseignant';

import { ApiService } from 'src/app/service/api.service';
import { DialogoptupComponent } from  '../dialogoptup/dialogoptup.component';
@Component({
  selector: 'app-optup',
  templateUrl: './optup.component.html',
  styleUrls: ['./optup.component.scss']
})
export class OptupComponent implements OnInit {
  displayedColumns: string[] = ['nomenseignant', 'up','periode' ,'creneaux','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listenseignant: Enseignant[];
  listoptup: Optup[]

  constructor(private dialog : MatDialog,private api:ApiService) { }
  openDialog() {
    this.dialog.open(DialogoptupComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
       this.getAllOptups();
      }
    })
  }
  getAllOptups()
  {
    this.api.getOptup().subscribe({
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


  deleteOptup(_id:string){
    this.api.deleteOptup(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllOptups();
      }
    })
  
  }

  ngOnInit(): void {
    this.getAllOptups();


    this.api.getOptup().subscribe(
      (data: Optup[]) => {
         this.listoptup = data;
      })


      this.api.getEnseignant().subscribe(
        (data: Enseignant[]) => {
           this.listenseignant = data;
        })
  }
  editOptup(row :any){
    this.dialog.open(DialogoptupComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update')
      {
        this.getAllOptups();
      }
    })
    
  }
  

}
