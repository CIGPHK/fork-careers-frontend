import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { AppUser } from './app-user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<AppUser>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<AppUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public async login(email: string, password: string) {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    return credential.user;
  }

  public resetPassword$(email: string): Observable<void> {
    const fbAuth = firebase.default.auth();
    return from(fbAuth.sendPasswordResetEmail(email));
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
