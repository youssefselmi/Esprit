import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService:AuthService,private router: Router) {}

  ngOnInit() {}
    onLoginButtonClicked(email: string,password:string){
      this.authService.login(email,password).subscribe((res:HttpResponse<any>)=>{
        if(res.status ===200){
         if(res.body.msg==0){
          alert("verifiez mail");
         }
         else{
          if(res.body.msg==1){
            alert("verifiez password");
          }
          else{
        
          this.router.navigate(['/affectation']);
        }
        }
        }
        console.log(res);
        
      });
    }
    register(){
      this.router.navigate(['/register']);
    }
    forget(){
      this.router.navigate(['/resetpw']);
    }
  
  ngOnDestroy() {
  }

}
