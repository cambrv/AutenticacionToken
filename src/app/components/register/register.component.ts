import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 form: FormGroup;
 constructor(private _autenticacionService: AutenticacionService, private router: Router){
  this.form= new FormGroup({
    email: new FormControl(),
    password :new FormControl()
  });
 }
 ngOnInit(): void {
     
 }
 onSubmit(email: string, password: string, name: string, photo:string){
  console.log(this.form.value);
  //Devuelve una promesa
  this._autenticacionService.registerFireBase(email, password, name, photo)
  .then(response => {
    console.log(response);
    this.router.navigate(['/login']);
  }).catch(error => console.log(error));
 }
 redirigir():void{
  this.router.navigate(['/login']);
  }
}
