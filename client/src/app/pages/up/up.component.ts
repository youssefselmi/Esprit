import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Up } from 'src/app/service/up';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogupComponent } from '../dialogup/dialogup.component';

@Component({
  selector: 'app-up',
  templateUrl: './up.component.html',
  styleUrls: ['./up.component.css']
})
export class UpComponent implements OnInit {

 
  displayedColumns: string[] = ['nomup','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  listeup: Up[];



  constructor( private dialog : MatDialog,private api:ApiService,private router: Router) { }

  openDialog() {
    this.dialog.open(DialogupComponent,{

      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
    this.getAllUp();
      }
    })
  }


  getAllUp()
  {
    this.api.getUp().subscribe({
      next:(res)=>{
  
  
  this.dataSource = new MatTableDataSource(res);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  
  
           },
  
           error:(err)=>{
  
            alert("Error while fetching");
  
           }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteUp(_id:string){
    this.api.deleteUp(_id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllUp();
      }
    })
  
  }
  
  







  ngOnInit() {

    this.getAllUp();


    this.api.getUp().subscribe(
      (data: Up[]) => {
         this.listeup = data;
      })

  }




  
editUp(row :any){
  this.dialog.open(DialogupComponent,{
    width: '30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val ==='update')
    {
      this.getAllUp();
    }
  })
  
}


changementDePage = function (nomup) {

  this.router.navigate(['/'+nomup]);



/*else if(nomdep=='mecanique'){
  this.router.navigate(['/mecanique']);
}

else if(nomdep=='mecatronique'){
  this.router.navigate(['/mecatronique']);
}

else if(nomdep=='telecommunication'){
  this.router.navigate(['/telecommunication']);
}*/

};


}

