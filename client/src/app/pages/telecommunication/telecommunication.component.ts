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

 



      this.api.gettelecommunication().subscribe(
        (data: Classe[]) => {
           this.listtelecommunication = data;
           console.log(this.listtelecommunication)
        })
      



  }

}
