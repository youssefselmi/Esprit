import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Classe } from 'src/app/service/classe';

@Component({
  selector: 'app-informatique',
  templateUrl: './informatique.component.html',
  styleUrls: ['./informatique.component.css']
})
export class InformatiqueComponent implements OnInit {
  public copy: string;


  listeclasses: Classe[];
  listinformatique: Classe[];


  constructor(private api:ApiService) { }

  ngOnInit(): void {

  
   // display = function (informatique) {

      this.api.getClasse().subscribe(
        (data: Classe[]) => {
         for (var key in data) {
          if(data[key].nomdepartement != 'informatique'){
          delete data[key];
              } }
         var result_filter = data.filter( function(val){return true} );
          this.listinformatique = result_filter;  
        })
    //  };
  
    

  } 





   /*   this.api.getinformatique().subscribe(
        (data: Classe[]) => {
           this.listinformatique = data;
           console.log(this.listinformatique)
        })*/
      





        
  














}