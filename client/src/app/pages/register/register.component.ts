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



      let user = {
       name: "test 11",
        email:email,
        sujet: "Bienvnu cher fournisseur a notre magasin",
        html : "Hi   This is your password  "+password+"  thank you for joining us"+ `
            <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Alert Email</title>
        </head>
        <body>
        <h1> Cliquer ici pour S'authentifié .</h1>
        <a href="http://localhost:4200/#/login">Cliquer Ici</a>
        </body>
        </html>   
            `
  
      }
      this.authService.sendEmail("http://localhost:3003/sendmail", user).subscribe(
        data => {
          let res:any = data; 
          console.log("success"   );
        },
      );
    });
  }

}
