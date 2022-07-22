import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService:AuthService) {}

  ngOnInit() {}
    onLoginButtonClicked(email: string,password:string){
      this.authService.login(email,password).subscribe((res:HttpResponse<any>)=>{
        console.log(res);
      });
    }
  
  ngOnDestroy() {
  }

}
