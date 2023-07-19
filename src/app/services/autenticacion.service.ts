import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,UserCredential, signInWithEmailAndPassword, signOut, authState, updateProfile} from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
   private mensaje: string | null= null;
  constructor(private auth: Auth) { }
  
  getUserData(): Observable<User | null> {
    const currentUser = this.auth.currentUser;

    if (currentUser) {
      return of(currentUser);
    } else {
      return of(null);
    }
  }
  async getToken(): Promise<string | null> {
    const user = await this.auth.currentUser;
    
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    return null;
  }
  registerFireBase(email: string, password: string, name: string, photo: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        if (user) {
          return updateProfile(user, { displayName: name , photoURL: photo})
            .then(() => userCredential);
        } else {
          this.mensaje='No se pudo registrar';
          throw new Error('No se pudo actualizar el perfil del usuario');
        }
      });
  }
  loginFirebase(email:string,password:string){
    return signInWithEmailAndPassword(this.auth, email, password).catch(()=>{
      this.mensaje="Usuario o contraseña incorrectos";
    });
  }
  logOutFirebase(){
    return signOut(this.auth);
  }
  getState(){
    return authState(this.auth);
  }
}
