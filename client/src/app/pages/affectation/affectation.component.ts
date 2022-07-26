import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/service/affectation';
import { ApiService } from 'src/app/service/api.service';
import { Classe } from 'src/app/service/classe';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {




  
  listaffectation: Affectation[];
  listeclasses : Classe[];

  constructor(private api:ApiService) { }

  ngOnInit(): void {

    this.api.getClasse().subscribe(
      (data: Classe[]) => {
         this.listeclasses = data;
      })
    }



  click() {
   /* let i=0;    

    for (let index = 0; index < this.listeclasses.length; index++) {
      i +=  this.listeclasses[index].nombreclasses;        
    }
    console.log("taille tableau  d'affectation ===> "+  i);*/
  }








}



