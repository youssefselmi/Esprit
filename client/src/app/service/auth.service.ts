import { HttpClient, HttpResponse } from '@angular/common/http';
import { localizedString } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay,tap } from 'rxjs/operators';
import { LoginComponent } from '../pages/login/login.component';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private ApiService :ApiService, private router: Router) {}

    login(email : string,password : string){
      return this.ApiService.login(email,password).pipe(
        shareReplay(),
        tap((res:HttpResponse<any>)=>{
          //the auth tokens will be in the header of this response
          this.setSession(res.body._id,res.headers.get('x-access-token'),res.headers.get('x-refresh-token'));
          console.log('LOGGED IN');
        
        })
      )  
  }
  signup(email : string,password : string){
    return this.ApiService.signup(email,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        //the auth tokens will be in the header of this response
        this.setSession(res.body._id,res.headers.get('x-access-token'),res.headers.get('x-refresh-token'));
        console.log('SUCCESSFULY SIGNED UP AND NOW LOGGED IN');
      
      })
    )  
}
  logout(){
    this.removeSession();
    console.log('LOGGED OUT');
  }
  getAccessToken(){
    return localStorage.getItem('x-access-token');

  }
  getRefreshToken(){
    return localStorage.getItem('x-refresh-token');
  }
  setAccessToken(accessToken:string){
    localStorage.setItem('x-access-token',accessToken)

  }
  
  private setSession(userId:string,accessToken : string,refreshToken:string){
    localStorage.setItem('user-id',userId);
    localStorage.setItem('access-token',accessToken);
    localStorage.setItem('refresh-token',refreshToken);
  }
  private removeSession(){
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }
  
      
}
   

