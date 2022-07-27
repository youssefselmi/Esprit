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


  displayedColumns: string[] = ['nomclasse','nomdepartement' ,'nommodules','actions'];
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




  
  deleteAffectation(_id:string){
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









}



