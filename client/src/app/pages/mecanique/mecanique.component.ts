import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Classe } from 'src/app/service/classe';

@Component({
  selector: 'app-mecanique',
  templateUrl: './mecanique.component.html',
  styleUrls: ['./mecanique.component.css']
})
export class MecaniqueComponent implements OnInit {

  public copy: string;


  listmecanique: Classe[];


  constructor(private api:ApiService) { }

  ngOnInit(): void {

 




    this.api.getClasse().subscribe(
      (data: Classe[]) => {
       for (var key in data) {
        if(data[key].nomdepartement != 'mecanique'){
        delete data[key];
            } }
       var result_filter = data.filter( function(val){return true} );
        this.listmecanique = result_filter;  
      })

  






    /*  this.api.getmecanique().subscribe(
        (data: Classe[]) => {
           this.listmecanique = data;
           console.log(this.listmecanique)
        })*/
      



  }

}
