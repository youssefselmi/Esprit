import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Heuresup } from 'src/app/service/heuresup';

import { ApiService } from 'src/app/service/api.service';
import { DialogheuresupComponent } from  '../dialogheuresup/dialogheuresup.component';
import { Enseignant } from 'src/app/service/enseignant';

@Component({
  selector: 'app-heuresup',
  templateUrl: './heuresup.component.html',
  styleUrls: ['./heuresup.component.scss']
})
export class HeuresupComponent implements OnInit {
  displayedColumns: string[] = ['nomenseignant','periodes','nbreheures','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listheuresup: Heuresup[];
  listenseignant: Enseignant[];

  constructor(private dialog : MatDialog,private api:ApiService) { }
  openDialog() {
    this.dialog.open(DialogheuresupComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
       this.getAllheuresups();
      }
    })
  }
  getAllheuresups()
  {
    this.api.getHeuresup().subscribe({
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
        deleteheuresup(_id:string){
          this.api.deleteHeuresup(_id).subscribe({
            next:(res)=>{
              alert("Deleted successfully");
              this.getAllheuresups();
            }
          })
        
        }

  ngOnInit(): void {
    this.getAllheuresups();


    this.api.getHeuresup().subscribe(
      (data: Heuresup[]) => {
         this.listheuresup = data;
      })


      this.api.getEnseignant().subscribe(
        (data: Enseignant[]) => {
           this.listenseignant = data;
        })
  }
  editheuresup(row :any){
    this.dialog.open(DialogheuresupComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update')
      {
        this.getAllheuresups();
      }
    })
    
  }

}
