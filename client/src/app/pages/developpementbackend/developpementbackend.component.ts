import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Module } from 'src/app/service/modulee';

@Component({
  selector: 'app-developpementbackend',
  templateUrl: './developpementbackend.component.html',
  styleUrls: ['./developpementbackend.component.css']
})
export class DeveloppementbackendComponent implements OnInit {
  public copy: string;


  listemodules: Module[];


  constructor(private api:ApiService) { }

  ngOnInit(): void {

  

      this.api.getModule().subscribe(
        (data: Module[]) => {
         for (var key in data) {
          if(data[key].nomup != 'Développement Back end'){
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