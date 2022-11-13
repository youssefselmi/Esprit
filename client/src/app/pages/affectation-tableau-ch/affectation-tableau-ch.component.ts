import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/service/api.service';
import { DialogaffectationTableauCHComponent } from '../dialogaffectation-tableau-ch/dialogaffectation-tableau-ch.component';

@Component({
  selector: 'app-affectation-tableau-ch',
  templateUrl: './affectation-tableau-ch.component.html',
  styleUrls: ['./affectation-tableau-ch.component.css']
})
export class AffectationTableauCHComponent implements OnInit {

  displayedColumns: string[] = ['nomenseignant','type' ,'chargehorraire','nbrcrenauxp1','nbrcrenauxp2','p1','p2','charges1','nbrcrenauxp3','nbrcrenauxp4','p3','p4','charges2','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  listaffectation: AffectationTableauCHComponent[];


  constructor( private dialog : MatDialog,private api:ApiService) { }

  

  openDialog() {
    this.dialog.open(DialogaffectationTableauCHComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
       this.getAllAffectatioTH();
      }
    })
  }




  getAllAffectatioTH()
  {
    this.api.getAffectationTH().subscribe({
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



  
  deleteAffectationTH(_id:string){
    this.api.deleteAffectationTH(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllAffectatioTH();
      }
    })
  
  }
  
  







  ngOnInit(): void {

    this.getAllAffectatioTH();


    this.api.getAffectationTH().subscribe(
      (data: AffectationTableauCHComponent[]) => {
         this.listaffectation = data;
      })


  

  }



  





  editAffectationTH(row :any){
    this.dialog.open(DialogaffectationTableauCHComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update')
      {
        this.getAllAffectatioTH();
      }
    })
    
  }
  

}
