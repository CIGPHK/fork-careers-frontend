import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../auth/app-user.model';
import { AuthService } from '../auth/auth.service';
import { Application } from '../applications/application.model';
import { ApplicationsService } from '../applications/applications.service';

@Component({
  selector: 'careers-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile$: Observable<AppUser>;
  public applications$: Observable<Application[]>;

  constructor(private authService: AuthService, private applicationsService: ApplicationsService) {}

  ngOnInit() {
    this.profile$ = this.authService.user$;
    this.applications$ = this.applicationsService.getApplicationsForActiveUser$();
  }
}
