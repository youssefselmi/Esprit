import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departement } from './departement';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  REST_API: string = 'http://localhost:3001/departement';

     // Http Header
     httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');



  constructor(private http : HttpClient) { }

  getDepartement(){
     return this.http.get<any>(`${this.REST_API}/read`);
   }

   postProduct(data : any ){
    return this.http.post<any>(`${this.REST_API}/add`,data);
  }


  deleteDepartement( _id : string){
    let API_URL = `${this.REST_API}/${_id}`;
    return this.http.delete<any>(API_URL);
  }



  
  putDepartement(data : any, _id : string){
    let API_URL = `${this.REST_API}/update/${_id}`;
    return this.http.put<any>(API_URL,data);

  }

  




}
