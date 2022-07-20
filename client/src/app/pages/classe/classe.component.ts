import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/service/api.service';
import { Classe } from 'src/app/service/classe';
import { Departement } from 'src/app/service/departement';
import { DialogclasseComponent } from '../dialogclasse/dialogclasse.component';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {

  displayedColumns: string[] = ['nomclasse', 'nbretudiant','nomdepartement' ,'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  listclasse: Classe[];
  listdepartement: Departement[];


  constructor( private dialog : MatDialog,private api:ApiService) { }

  openDialog() {
    this.dialog.open(DialogclasseComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
       this.getAllClasses();
      }
    })
  }




  getAllClasses()
  {
    this.api.getClasse().subscribe({
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



  
  deleteClasse(_id:string){
    this.api.deleteClasse(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllClasses();
      }
    })
  
  }
  
  







  ngOnInit(): void {

    this.getAllClasses();


    this.api.getClasse().subscribe(
      (data: Classe[]) => {
         this.listclasse = data;
      })


      this.api.getDepartement().subscribe(
        (data: Departement[]) => {
           this.listdepartement = data;
        })

  }



  editClasse(row :any){
    this.dialog.open(DialogclasseComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update')
      {
        this.getAllClasses();
      }
    })
    
  }
  

}
