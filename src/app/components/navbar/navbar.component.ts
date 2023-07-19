import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  public isLogged : boolean | undefined;
constructor(private route:Router, private _autenticacionService: AutenticacionService, private router:Router) {
}
ngOnInit(): void {
    this._autenticacionService.getState()
    .subscribe(state => {
      if(state){
        this.isLogged= true;
        this.router.navigate(['usuario']);
      } else {
        this.isLogged = false;
      }
    })}
    Salir(){
      this._autenticacionService.logOutFirebase()
      .then(() => {this.router.navigate(['/login'])})
      .catch(error => console.log(error));
    }
}