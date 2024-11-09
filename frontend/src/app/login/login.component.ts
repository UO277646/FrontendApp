declare var google:any;
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorService } from '../services/validator/validator.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router=inject(Router)
  private validatorService=inject(ValidatorService);
  ngOnInit(): void{
    google.accounts.id.initialize({
      client_id:"1043590116943-7mn3qj6i76kuvmv65sb1nbfp2sml5lo4.apps.googleusercontent.com",
      callback:(resp:any)=>this.handleLogin(resp)
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
        theme:"filled-blue",
        size:"large",
        shape:"rectangle",
        width:350
    })
  }
  private decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }
  async handleLogin(response:any){
    if(response){
      //console.log(response);
      //console.log(response.credential);
      //Validate
      const result = await this.validatorService.validateToken(response.credential);
      localStorage.setItem('authToken', result.token);
      //Decode
      const payLoad=this.decodeToken(response.credential);

      //store in session
      sessionStorage.setItem("loggedInUser",JSON.stringify(payLoad));
      //navigate to proyectos/
      const currentUrl = this.router.url;
      //this.router.navigate([`${currentUrl}/proyectos`]);
      window.location.href="/proyectos";
    }
  }
}
