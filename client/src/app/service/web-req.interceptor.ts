import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest }from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }
 
  intercept(request: HttpRequest<any>,next:HttpHandler): Observable<any>{
    request=this.addAuthHeader(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        console.log(error);
        if(error.status===401){
          this.authService.logout();
        }
        return throwError(error);
      })
    )

  }
  addAuthHeader(request:HttpRequest<any>){
    const token=this.authService.getAccessToken();
    if(token){
      return request.clone({
        setHeaders:{
          'x-access-token':token
        }
      })
    }
    return request;
  }
  refreshAccessToken(){
  //method in auth service to send a request to rfresh the access token
  }
}
