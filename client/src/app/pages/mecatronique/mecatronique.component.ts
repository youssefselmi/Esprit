import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Classe } from 'src/app/service/classe';

@Component({
  selector: 'app-mecatronique',
  templateUrl: './mecatronique.component.html',
  styleUrls: ['./mecatronique.component.css']
})
export class MecatroniqueComponent implements OnInit {

  public copy: string;


  listmecatronique: Classe[];


  constructor(private api:ApiService) { }

  ngOnInit(): void {

 

    this.api.getClasse().subscribe(
      (data: Classe[]) => {
       for (var key in data) {
        if(data[key].nomdepartement != 'mecatronique'){
        delete data[key];
            } }
       var result_filter = data.filter( function(val){return true} );
        this.listmecatronique = result_filter;  
      })

  






     /* this.api.getmecatronique().subscribe(
        (data: Classe[]) => {
           this.listmecatronique = data;
           console.log(this.listmecatronique)
        })*/
      



  }

}
