import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'careers-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  redirectDelay = 0;
  showMessages: any = {};

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(
    protected afAuth: AngularFireAuth,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private afs: AngularFirestore
  ) {}

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.afAuth
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((data) => {
        return this.afs
          .collection('users')
          .doc(data.user.uid)
          .set({
            first: this.user.firstName,
            last: this.user.lastName,
            email: this.user.email,
            displayName: `${this.user.firstName} ${this.user.lastName}`,
            type: 'candidate',
            created: new Date(),
            uid: data.user.uid,
            terms: this.user.terms,
            phone: this.user.phone
          });
      })
      .then((_) => {
        this.router.navigate(['']);
      });
  }
}
