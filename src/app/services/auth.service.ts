import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
  ) { }

  public checkUser(): Observable<any> {
    return this.auth.user;
  }

  public login(email: string, pass: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, pass);
  }

  public logout(): Promise<any> {
    return this.auth.signOut();
  }
}
