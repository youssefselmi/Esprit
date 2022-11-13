import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.scss']
})
export class ResetpwComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  Clicked(email: string,password:string,password1:string){
    if(password!=password1){
      alert("passwords don't match");
    }else{
    this.authService.reset(email,password).subscribe((res:HttpResponse<any>)=>{
      console.log(res);
    });
    alert("password modifié!!");}
  
}
}
