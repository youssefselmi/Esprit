import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Classe } from 'src/app/service/classe';

@Component({
  selector: 'app-telecommunication',
  templateUrl: './telecommunication.component.html',
  styleUrls: ['./telecommunication.component.css']
})
export class TelecommunicationComponent implements OnInit {

  public copy: string;


  listtelecommunication: Classe[];


  constructor(private api:ApiService) { }

  ngOnInit(): void {

 

 

    this.api.getClasse().subscribe(
      (data: Classe[]) => {
       for (var key in data) {
        if(data[key].nomdepartement != 'telecommunication'){
        delete data[key];
            } }
       var result_filter = data.filter( function(val){return true} );
        this.listtelecommunication = result_filter;  
      })




  }

}
