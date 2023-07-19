import { Component } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private _autenticacionService: AutenticacionService, private router: Router){}
onSubmit(email: string, password:string){
  this._autenticacionService.loginFirebase(email, password)
  .then(response =>{
    console.log(response);
    this.router.navigate(['/usuario']);
  })
  .catch(error => console.log(error));
}
redirigir():void{
this.router.navigate(['/register']);
}
}
