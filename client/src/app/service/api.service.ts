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
  REST_APIC: string = 'http://localhost:3001/classe';
  REST_APIU: string = 'http://localhost:3001/up';
  REST_APIM: string = 'http://localhost:3001/module';
  REST_APIA: string = 'http://localhost:3001/affectation';



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




  /////////////////////// Classe ///////////////////////////
  getClasse(){
    return this.http.get<any>(`${this.REST_APIC}/read`);
  }


  deleteClasse( _id : string){
    let API_URL = `${this.REST_APIC}/${_id}`;
    return this.http.delete<any>(API_URL);
  }


  postClasse(data : any ){
    return this.http.post<any>(`${this.REST_APIC}/add`,data);
  }


  putClasse(data : any, _id : string){
    let API_URL = `${this.REST_APIC}/update/${_id}`;
    return this.http.put<any>(API_URL,data);

  }

  //////////// get informatique ///////////////////////

  getinformatique(){
    return this.http.get<any>(`${this.REST_APIC}/readinfo`);
  }

  getmecanique(){
    return this.http.get<any>(`${this.REST_APIC}/readmecanique`);
  }

  getmecatronique(){
    return this.http.get<any>(`${this.REST_APIC}/readmecatronique`);
  }

  gettelecommunication(){
    return this.http.get<any>(`${this.REST_APIC}/readtelecommunication`);
  }

  ///////////////////////////////// UP ////////////////////////


  getUp(){
    return this.http.get<any>(`${this.REST_APIU}/read`);
  }


  deleteUp( _id : string){
    let API_URL = `${this.REST_APIU}/${_id}`;
    return this.http.delete<any>(API_URL);
  }


  postUp(data : any ){
    return this.http.post<any>(`${this.REST_APIU}/add`,data);
  }


  putUp(data : any, _id : string){
    let API_URL = `${this.REST_APIU}/update/${_id}`;
    return this.http.put<any>(API_URL,data);

  }



  ///////////////////////////////////// Modules //////////////////////




  getModule(){
    return this.http.get<any>(`${this.REST_APIM}/read`);
  }


  deleteModule( _id : string){
    let API_URL = `${this.REST_APIM}/${_id}`;
    return this.http.delete<any>(API_URL);
  }


  postModule(data : any ){
    return this.http.post<any>(`${this.REST_APIM}/add`,data);
  }


  putModule(data : any, _id : string){
    let API_URL = `${this.REST_APIM}/update/${_id}`;
    return this.http.put<any>(API_URL,data);

  }




  /////////////////////////// Affectation //////////////////////////

  getAffectation(){
    return this.http.get<any>(`${this.REST_APIA}/read`);
  }


  
  postAffectation(data : any ){
    return this.http.post<any>(`${this.REST_APIA}/add`,data);
  }



}
