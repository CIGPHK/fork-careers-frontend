import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'careers-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent {
  public submitted = false;
  public errorMessage: string;
  public successMessage: string;
  public userEmail: string;

  constructor(private service: AuthService, private router: Router) {}

  requestPass(): void {
    if (this.userEmail) {
      this.submitted = true;

      this.service.resetPassword$(this.userEmail).subscribe(
        () => {
          this.successMessage = 'You will soon receive an email to reset your password';

          setTimeout(() => {
            return this.router.navigate(['/login']);
          }, 2500);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
