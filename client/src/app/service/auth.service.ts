import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { localizedString } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, shareReplay,tap } from 'rxjs/operators';
import { LoginComponent } from '../pages/login/login.component';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  test = "How r u?";

  constructor(private ApiService :ApiService, private router: Router,private http: HttpClient) {}

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
       /*  catchError((error:HttpErrorResponse)=>{
          console.log(error);
        }) */
        //this.router.navigate(['/dashbord']);
      
      })
    )  
}
  logout(){
    this.removeSession();
    console.log('LOGGED OUT');
    this.router.navigate(['/login']);
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
  reset(email:string,password:string){
    let data={email,password};
    this.router.navigate(['/login']);
    return this.ApiService.resetpw(data);
    

  }
  
  private setSession(userId:string,accessToken : string,refreshToken:string){
    localStorage.setItem('user-id',userId);
    localStorage.setItem('x-access-token',accessToken);
    localStorage.setItem('x-refresh-token',refreshToken);
  }
  private removeSession(){
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
 
  

 
    
  
    httpGet(url) {
      return this.http.get(url);
    }
  
    httpPost(url, {}) {
      return this.http.post(url, { name: "Subrat" });
    }
  
    sendEmail(url, data) {
      return this.http.post(url, data);
    }
  
  
    sendEmaildelete(url, data) {
      return this.http.post(url, data);
    }
  
      
}
   

