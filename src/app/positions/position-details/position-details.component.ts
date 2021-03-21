import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../position.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { PositionsService } from '../positions.service';
import { ApplicationsService } from 'src/app/applications/applications.service';
import { AppUser } from 'src/app/auth/app-user.model';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'careers-position-details',
  templateUrl: './position-details.component.html',
  styleUrls: ['./position-details.component.scss']
})
export class PositionDetailsComponent implements OnInit {
  public position$: Observable<Position>;
  public applicationID$: Observable<string>;
  public alreadyApplied$: Observable<boolean>;
  public user$: Observable<AppUser>;

  private positionID: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private positionsService: PositionsService,
    private applicationsService: ApplicationsService,
    private auth: AuthService,
    protected gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.position$ = this.route.paramMap.pipe(
      map((positionID) => positionID.get('id')),
      tap((positionID) => {
        this.positionID = positionID;

        this.gaService.pageView('/positions', 'Position details', undefined, { positionId: positionID })

        this.applicationID$ = this.applicationsService.getApplicationIDForActiveUserByPosition$(positionID);
      }),
      switchMap((positionID) => this.positionsService.getPosition$(positionID))
    );

    this.user$ = this.auth.user$;

    this.alreadyApplied$ = this.auth.user$.pipe(
      map((user) => user?.uid),
      switchMap((userid) =>
        this.position$.pipe(
          map((position) => (userid ? position.applicants && position.applicants.includes(userid) : false))
        )
      )
    );
  }

  toApplication() {
    this.router.navigate(['/applications', 'apply'], {
      queryParams: {
        positionID: this.positionID
      }
    });
  }

  viewApplication(id: string) {
    this.router.navigate(['/applications', 'details', id]);
  }
}
