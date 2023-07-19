import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { canActivate , redirectUnauthorizedTo} from '@angular/fire/auth-guard'; 
const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {
    path: 'usuario', component:UsuarioComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {path: 'register', component:RegisterComponent},
  {path: 'home', component:HomeComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
