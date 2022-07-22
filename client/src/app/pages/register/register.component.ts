import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  onSignupButtonClicked(email: string,password:string){
    this.authService.signup(email,password).subscribe((res:HttpResponse<any>)=>{
      console.log(res);
    });
  }

}
