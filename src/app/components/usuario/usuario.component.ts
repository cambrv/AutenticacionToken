import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { User } from 'firebase/auth'; 
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarioAutenticado: User | null = null;
  token: string | null = null;

constructor( private _autenticacionService: AutenticacionService, private router: Router){
}
ngOnInit():void{
  this.obtenerDatosUsuario();
  this.getToken();
}
async getToken(): Promise<void> {
  this.token = await this._autenticacionService.getToken();
}
obtenerDatosUsuario(): void {
  this._autenticacionService.getUserData().subscribe((user: User | null) => {
    this.usuarioAutenticado = user;
  });
}
onClick(){
  this._autenticacionService.logOutFirebase()
  .then(
    ()=>{
      this.router.navigate(['/register']);
    }
  )
  .catch(error=> console.log(error));
}
}
