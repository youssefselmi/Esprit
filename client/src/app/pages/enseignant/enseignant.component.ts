import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Enseignant } from 'src/app/service/enseignant';

import { Competence } from 'src/app/service/competence';
import { ApiService } from 'src/app/service/api.service';
import { DialogenseignantComponent } from  '../dialogenseignant/dialogenseignant.component';
import { AffectationTablleHorraire } from 'src/app/service/affectationTableauxChargeHorraire';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss']
})
export class EnseignantComponent implements OnInit { 
  displayedColumns: string[] = ['nomenseignant', 'email','password' ,'nomcompetence','type','nbrcrenauxp1','nbrcrenauxp2','nbrcrenauxp3','nbrcrenauxp4','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  listenseignant: Enseignant[];
  listcompetence: Competence[];
  listeaffectationchargehorraire : AffectationTablleHorraire[];


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







  deleteEnseignant(_id:string,nom:string){
    this.api.deleteEnseignant(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllEnseignants();
      }
    })




  ////// supprimer automatiquement les  enseignant i se trouvent dans ce tableau
  console.log( this.listeaffectationchargehorraire);
  alert("L'enseiganat "+nom+"  var etre supprimé automatiquement avec le tableau de charge horraire");

  for (let index = 0; index < this.listeaffectationchargehorraire.length; index++) {



    if(this.listeaffectationchargehorraire[index].nomenseignant==nom)
    {    
      this.api.deleteAffectationTH(this.listeaffectationchargehorraire[index]._id).subscribe({
        next:(res)=>{ } })

   } 
  }


  
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




        
      this.api.getAffectationTH().subscribe(
        (data: AffectationTablleHorraire[]) => {
           this.listeaffectationchargehorraire = data;
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





  local(){


      let initialValue = JSON.parse(localStorage.getItem('types'));
      console.log(initialValue);
    
}














}
