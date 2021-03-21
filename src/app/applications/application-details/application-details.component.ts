import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../application.model';
import { ApplicationsService } from '../applications.service';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';
import { PositionsService } from 'src/app/positions/positions.service';
import { Position } from 'src/app/positions/position.model';
import { YesNoDialogComponent } from 'src/app/shared/yes-no-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'careers-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
  public application$: Observable<Application>;
  public position$: Observable<Position>;
  private applicationID: string;
  private isPositionClosed = true;

  constructor(
    private applicationsService: ApplicationsService,
    private positionsService: PositionsService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    protected gaService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.application$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.applicationsService.getApplication$(params.get('id'))),
      tap((application: Application) => {
        this.applicationID = application.id;
        this.gaService.pageView('/applications/details', 'Applications details', undefined, { applicationId: application.id})
      })
    );

    this.position$ = this.application$.pipe(
      switchMap((application) => this.positionsService.getPosition$(application.position)),
      tap((position) => (this.isPositionClosed = position.closed))
    );
  }

  public async withdraw() {
    const dialogRef = this.dialogService.open(YesNoDialogComponent, {
      context: {
        body: `Do you want to withdraw your application?`,
        title: `Withdraw Application`
      }
    });

    dialogRef.onClose.subscribe((proceed: boolean) => {
      if (proceed) {
        this.applicationsService.withdrawApplication(this.applicationID);
      }
    });
  }

  public showWithdrawButton(application: Application): boolean {
    return !['rejected', 'withdrawn'].includes(application.status);
  }

  public async reopen() {
    await this.applicationsService.reopenApplication(this.applicationID);
  }

  public showReopenButton(application: Application): boolean {
    return !this.isPositionClosed && application.status === 'withdrawn';
  }
}
