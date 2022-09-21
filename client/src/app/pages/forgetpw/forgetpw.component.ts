import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-forgetpw',
  templateUrl: './forgetpw.component.html',
  styleUrls: ['./forgetpw.component.scss']
})
export class ForgetpwComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  Clicked(email){
    alert("Le lien de reset password est envoyé vers votre email :)")
    let user = {
      name: "test 11",
       email:email,
       sujet: "Reset password",
       html :  `
       <!DOCTYPE html>
   <html>
   <head>
     <meta charset="utf-8">
     <meta http-equiv="x-ua-compatible" content="ie=edge">
     <title>Alert Email</title>
   </head>
   <body>
   
   <a href="http://localhost:4200/#/newpw"><h1> Cliquer ici pour Modifier password .</h1></a>
   </body>
   </html>   
       `
 
     }
     this.authService.sendEmail("http://localhost:3001/sendmail/sendmail", user).subscribe(
       data => {
         let res:any = data; 
         console.log("success"   );
       },
     );
  }


}
