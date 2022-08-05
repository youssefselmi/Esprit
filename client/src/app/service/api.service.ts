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
  REST_APIL: string = 'http://localhost:3001/user/users';
  REST_APICM: string = 'http://localhost:3001/competence';
  REST_APIE: string = 'http://localhost:3001/enseignant';

  REST_APIA: string = 'http://localhost:3001/affectation';
  REST_APIO: string = 'http://localhost:3001/optup';


  REST_APIAFFECTATIONTABLECHARGEHORRAIRE: string = 'http://localhost:3001/affectationtabchargehorraire';



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


  /**************LOGIN************ */
  login(email:string, password:string){
    let API_URL = `${this.REST_APIL}/login`;
    return this.http.post(API_URL,{
      email,
      password
    },{observe:'response'})
  }
  /*********signup ***** */
  signup(email:string, password:string){
    let API_URL = `${this.REST_APIL}`;
    return this.http.post(API_URL,{
      email,
      password
    },{observe:'response'})
  }
  /***********competences ****** */
  getCompetence(){
    return this.http.get<any>(`${this.REST_APICM}/read`);
  }


  deleteCompetence( _id : string){
    let API_URL = `${this.REST_APICM}/${_id}`;
    return this.http.delete<any>(API_URL);
  }


  postCompetence(data : any ){
    return this.http.post<any>(`${this.REST_APICM}/add`,data);
  }


  putCompetence(data : any, _id : string){
    let API_URL = `${this.REST_APICM}/update/${_id}`;
    return this.http.put<any>(API_URL,data);

  }
  /**************Enseigant ************/
  getEnseignant(){
    return this.http.get<any>(`${this.REST_APIE}/read`);
  }


  deleteEnseignant( _id : string){
    let API_URL = `${this.REST_APIE}/${_id}`;
    return this.http.delete<any>(API_URL);
  }


  postEnseignant(data : any ){
    return this.http.post<any>(`${this.REST_APIE}/add`,data);
  }


  putEnseignant(data : any, _id : string){
    let API_URL = `${this.REST_APIE}/update/${_id}`;
    return this.http.put<any>(API_URL,data);

  }





  /////////////////////////// Affectation //////////////////////////

  getAffectation(){
    return this.http.get<any>(`${this.REST_APIA}/read`);
  }


  
  postAffectation(data : any ){
    return this.http.post<any>(`${this.REST_APIA}/add`,data);
  }

  deleteAffectation( _id : string){
    let API_URL = `${this.REST_APIA}/${_id}`;
    return this.http.delete<any>(API_URL);
  }



  putAffectation(data : any, _id : string){
    let API_URL = `${this.REST_APIA}/update/${_id}`;
    return this.http.put<any>(API_URL,data);

  }
  /************Optup *************/
  getOptup(){
    return this.http.get<any>(`${this.REST_APIO}/read`);
  }


  
  postOptup(data : any ){
    return this.http.post<any>(`${this.REST_APIO}/add`,data);
  }

  deleteOptup( _id : string){
    let API_URL = `${this.REST_APIO}/${_id}`;
    return this.http.delete<any>(API_URL);
  }



  putOptup(data : any, _id : string){
    let API_URL = `${this.REST_APIO}/update/${_id}`;
    return this.http.put<any>(API_URL,data);

  }





  ///////////////////////////////////// Affectation Table Charge Horraire //////////////////////////////


  getAffectationTH(){
    return this.http.get<any>(`${this.REST_APIAFFECTATIONTABLECHARGEHORRAIRE}/read`);
  }


  
  postAffectationTH(data : any ){
    return this.http.post<any>(`${this.REST_APIAFFECTATIONTABLECHARGEHORRAIRE}/add`,data);
  }

  deleteAffectationTH( _id : string){
    let API_URL = `${this.REST_APIAFFECTATIONTABLECHARGEHORRAIRE}/${_id}`;
    return this.http.delete<any>(API_URL);
  }



  putAffectationTH(data : any, _id : string){
    let API_URL = `${this.REST_APIAFFECTATIONTABLECHARGEHORRAIRE}/update/${_id}`;
    return this.http.put<any>(API_URL,data);

  }




  /////////////////////////////////////////////////////////////////////////////////////////////

}
