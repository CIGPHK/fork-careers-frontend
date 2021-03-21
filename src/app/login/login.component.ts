import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'careers-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginError: string;
  redirectDelay = 0;
  showMessages: any = {};

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted = false;

  constructor(private auth: AuthService, private router: Router) {}

  public async login(): Promise<void> {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    try {
      await this.auth.login(this.user.email, this.user.password);
      this.router.navigate(['']);
    } catch (error) {
      this.loginError = error.message;
      console.error(this.loginError);
    } finally {
      this.submitted = false;
    }
  }
}
