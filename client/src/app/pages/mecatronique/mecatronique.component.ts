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

 



      this.api.getmecatronique().subscribe(
        (data: Classe[]) => {
           this.listmecatronique = data;
           console.log(this.listmecatronique)
        })
      



  }

}
