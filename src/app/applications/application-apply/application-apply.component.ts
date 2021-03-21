import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Position } from 'src/app/positions/position.model';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { PositionsService } from 'src/app/positions/positions.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/auth/app-user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Application } from '../application.model';
import { ApplicationsService } from '../applications.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'careers-application-apply',
  templateUrl: './application-apply.component.html',
  styleUrls: ['./application-apply.component.scss']
})
export class ApplicationApplyComponent implements OnInit {
  public editor = ClassicEditor;
  public position$: Observable<Position>;
  public fileToUpload: any;
  private task: AngularFireUploadTask;
  private snapshot$: Observable<any>;
  private user: AppUser;
  public details: Application = {
    answers: null,
    availability: null,
    candidate: null,
    date: null,
    id: null,
    immigration: false,
    interviewMode: null,
    path: null,
    position: null,
    privacy: null,
    recruiters: null,
    retainprofile: null,
    status: null
  };
  private positionID: string;
  private applicants: any[] = [];
  public submitted$: Observable<boolean>;
  public submittedBool = false;
  private recruiters: string[] = [];
  private applicationID: string;
  public answers: string[] = [];
  public answersObs: Observable<any>;
  public privacyticked = false;
  public retainprofile = false;
  private interviewMode: string;

  constructor(
    private applicationsService: ApplicationsService,
    private positionsService: PositionsService,
    public domSanitizer: DomSanitizer,
    private afs: AngularFirestore,
    private router: Router,
    private auth: AuthService,
    protected route: ActivatedRoute,
    protected storage: AngularFireStorage,
    private gaService : GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.position$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => this.positionsService.getPosition$(params.get('positionID'))),
      tap((position: Position) => {
        this.positionID = position.id;

        if (position.applicants !== undefined) {
          this.applicants = position.applicants;
        }

        if (position.recruiters !== undefined) {
          this.recruiters = position.recruiters;
        }

        if (position.interviewMode !== undefined) {
          this.interviewMode = position.interviewMode;
        }

        if (position.questions && position.questions.length > 0 && this.answers.length === 0) {
          for (let index = 0; index < position.questions.length; index++) {
            this.answers[index] = '';
          }
        }

        this.gaService.pageView('/applications/apply', 'Application first step', undefined,{ positionID: position.id} )

      })
    );

    this.auth.user$.subscribe((user) => (this.user = user));

    this.submitted$ = this.auth.user$.pipe(
      map((user) => user.uid),
      switchMap((userID) =>
        this.position$.pipe(map((position) => (position.applicants ? position.applicants.includes(userID) : false)))
      )
    );
  }

  getFile(event: { item: (arg0: number) => any }) {
    const file = event.item(0);
    if (file.type !== 'application/pdf') {
      console.error('unsupported file type :( ');
      return;
    } else {
      this.fileToUpload = file;
    }
  }

  createApplication() {
    this.submittedBool = true;

    this.gaService.pageView('/applications/apply', 'Application last step', undefined, {positionId: this.positionID})
    // The File object
    const id = this.afs.createId();
    this.applicants.push(this.user.uid);

    this.details.id = id;
    this.details.date = new Date();
    this.details.status = 'submitted';
    this.details.candidate = this.user.uid;
    this.details.position = this.positionID;
    this.details.recruiters = this.recruiters;
    this.details.privacy = this.privacyticked;
    this.details.retainprofile = this.retainprofile;
    this.details.interviewMode = this.interviewMode;
    this.details.answers = this.answers;

    // The storage path
    const path = `applications/${this.positionID}/${id}/${this.fileName}`;
    this.details.path = path;

    // The main task
    this.task = this.storage.upload(path, this.fileToUpload, {
      customMetadata: { recruiters: JSON.stringify(this.recruiters) }
    });

    // Progress monitoring

    this.snapshot$ = this.task.snapshotChanges();
    this.snapshot$ = this.task.snapshotChanges().pipe(
      tap((snap) => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.applicationsService.createApplication(this.details).then(() => (this.applicationID = id));
        }
      })
    );
    this.snapshot$.subscribe();
  }

  toApplication() {
    this.router.navigate(['/applications', 'details', this.applicationID]);
  }

  checkChanges() {
    const ans = Object.keys(this.answers).map((data) => {
      const answer = this.answers[data];
      return answer;
    });
    const check = ans.length === 0 ? false : ans.map((data) => (data.split(' ').length > 500 ? false : true));
    this.answersObs = of(check[0]);
  }

  downloadFile() {
    const blob = new Blob([this.fileToUpload], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  objectToArray(obj) {
    return Object.keys(obj).map((data) => {
      const answer = obj[data];
      return answer;
    });
  }

  public logdetails(): void {}

  private get fileName(): string {
    if (this.user.first && this.user.last) {
      return `${this.user.first}.${this.user.last}.pdf`;
    } else {
      return `${this.user.displayName.replace(' ', '.')}.pdf`;
    }
  }
}
