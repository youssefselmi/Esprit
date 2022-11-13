import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Affectation } from 'src/app/service/affectation';
import { ApiService } from 'src/app/service/api.service';
import { Classe } from 'src/app/service/classe';
import { DialogaffectationComponent } from '../dialogaffectation/dialogaffectation.component';
//import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as Workbook from 'exceljs/dist/exceljs.min.js'
import * as XLSX from 'xlsx'; 

import * as _ from 'lodash'; 
import { HistoriqueAffectation } from 'src/app/service/hisroriqueaffectation';


@Component({
  selector: 'app-historiquedesaffectation',
  templateUrl: './historiquedesaffectation.component.html',
  styleUrls: ['./historiquedesaffectation.component.scss']
})
export class HistoriquedesaffectationComponent implements OnInit {

 
  displayedColumns: string[] = ['nomclasse','nomdepartement' ,'nommodules','semestre','periode','nomenseignant1','nomenseignant2','anneuni'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  apiResponse:any = [];

  fileName= 'ExcelSheet.xlsx';  

  listaffectation: HistoriqueAffectation[];
  listeclasses : Classe[];

  emplselected:Number;


  selectedDay: string = '';


  selectedChangeHandler(event:any){
    this.selectedDay = event.target.value;
//console.log("zzzzzzzzzz  "+this.selectedDay);

  }

  constructor(private dialog : MatDialog,private api:ApiService) { }





  

  ngOnInit(): void {



    this.getAllAffectations();


    this.api.getHistorique().subscribe(
      (data: HistoriqueAffectation[]) => {

         this.listaffectation = data;
      })





      
    }



  /*  public onChange(event): void {  //event will give you full breif of action
      const newVal = event.target.value;
      console.log("hococo  "+newVal);
    }*/
 







    getAllAffectations()
    {
      this.api.getHistorique().subscribe({
        next:(res)=>{
    
    
          this.apiResponse = res;

    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    
             },
    
             error:(err)=>{
    
              alert("Error while fetching");
    
             }
      })
    }





    
    onChange($event:any) {

let fitereddata = _.filter(this.apiResponse,(item)=>{
  return item.anneuni.toLowerCase() == $event.value.toLowerCase();
})


this.dataSource = new MatTableDataSource(fitereddata);



   /* const filterValue = (event.target as HTMLSelectElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/


  }



  

  
  










  
  






  
  editAffectation(row :any){
    this.dialog.open(DialogaffectationComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update')
      {
        this.getAllAffectations();
      }
    })
    
  }









  exportExcel() {

      /* table id is passed over here */   
      let element = document.getElementById('excel-table'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);



      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);



/*
      let workbook = new Workbook();
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(this.fileName, 'Affectation.xlsx');
      })
*/
}

































}