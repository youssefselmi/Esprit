import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Disponibilite } from 'src/app/service/disponibilite';

import { ApiService } from 'src/app/service/api.service';
import { DialogdisponibiliteComponent } from  '../dialogdisponibilite/dialogdisponibilite.component';
import { Enseignant } from 'src/app/service/enseignant';

@Component({
  selector: 'app-disponibilite',
  templateUrl: './disponibilite.component.html',
  styleUrls: ['./disponibilite.component.scss']
})
export class DisponibiliteComponent implements OnInit {
  displayedColumns: string[] = ['nomenseignant', 'periodes','motif' ,'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listdisponibilite: Disponibilite[];
  listenseignant: Enseignant[];


  constructor(private dialog : MatDialog,private api:ApiService) { }
  openDialog() {
    this.dialog.open(DialogdisponibiliteComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
       this.getAlldisponibilites();
      }
    })
  }
  getAlldisponibilites()
  {
    this.api.getDisponibilite().subscribe({
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
  deletedisponibilite(_id:string){
    this.api.deleteDisponibilite(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAlldisponibilites();
      }
    })
  
  }

  ngOnInit(): void {
    this.getAlldisponibilites();


    this.api.getDisponibilite().subscribe(
      (data: Disponibilite[]) => {
         this.listdisponibilite = data;
      })


      this.api.getEnseignant().subscribe(
        (data: Enseignant[]) => {
           this.listenseignant = data;
        })
  }
  editdisponibilite(row :any){
    this.dialog.open(DialogdisponibiliteComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update')
      {
        this.getAlldisponibilites();
      }
    })
    
  }

}
