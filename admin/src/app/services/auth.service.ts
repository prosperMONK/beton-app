import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }
  isAuth(){
    return this.afAuth.authState;
  }
  login(data){
    this.afAuth.signInWithEmailAndPassword(data.email, data.password);
  }
  logOut(){
this.afAuth.signOut();
  }
}
