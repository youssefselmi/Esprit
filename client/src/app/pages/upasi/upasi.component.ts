import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Module } from 'src/app/service/modulee';

@Component({
  selector: 'app-upasi',
  templateUrl: './upasi.component.html',
  styleUrls: ['./upasi.component.css']
})
export class UPASIComponent implements OnInit {

  public copy: string;


  listemodules: Module[];


  constructor(private api:ApiService) { }

  ngOnInit(): void {

  

      this.api.getModule().subscribe(
        (data: Module[]) => {
         for (var key in data) {
          if(data[key].nomup != 'UP ASI'){
          delete data[key];
              } }
         var result_filter = data.filter( function(val){return true} );
          this.listemodules = result_filter;  
        })
  
    

  } 





        
  














}