import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/service/modulee';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-developpementfrontend',
  templateUrl: './developpementfrontend.component.html',
  styleUrls: ['./developpementfrontend.component.css']
})
export class DeveloppementfrontendComponent implements OnInit {

  public copy: string;


  listemodules: Module[];


  constructor(private api:ApiService) { }

  ngOnInit(): void {

  

      this.api.getModule().subscribe(
        (data: Module[]) => {
         for (var key in data) {
          if(data[key].nomup != 'Développement Front end'){
          delete data[key];
              } }
         var result_filter = data.filter( function(val){return true} );
          this.listemodules = result_filter;  
        })
  
    

  } 





   /*   this.api.getinformatique().subscribe(
        (data: Classe[]) => {
           this.listinformatique = data;
           console.log(this.listinformatique)
        })*/
      





        
  














}