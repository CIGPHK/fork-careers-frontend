import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from './application.model';
import { AuthService } from '../auth/auth.service';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { PositionsService } from '../positions/positions.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  constructor(private auth: AuthService, private afs: AngularFirestore, private positionsService: PositionsService) {}

  public getApplicationsForActiveUser$(): Observable<Application[]> {
    return this.auth.user$.pipe(
      switchMap((user) =>
        this.afs
          .collection<Application>('applications', (ref) => ref.where('candidate', '==', user.uid))
          .snapshotChanges()
          .pipe(
            map((applicationRefs) => {
              return applicationRefs.map((applicationRef) => {
                const id = applicationRef.payload.doc.id;
                const docData = applicationRef.payload.doc.data();
                const position$ = this.positionsService.getPosition$(docData.position);
                return { ...docData, id, position$ };
              });
            })
          )
      )
    );
  }

  public getApplicationIDForActiveUserByPosition$(positionID: string): Observable<string> {
    return this.auth.user$.pipe(
      switchMap((user) =>
        this.afs
          .collection<Application>('applications', (ref) =>
            ref.where('candidate', '==', user.uid).where('position', '==', positionID)
          )
          .snapshotChanges()
          .pipe(
            map((applicationsRefs) =>
              applicationsRefs && applicationsRefs.length > 0 ? applicationsRefs[0].payload.doc.id : null
            )
          )
      )
    );
  }

  public getApplication$(id: string): Observable<Application> {
    return this.afs.collection('applications').doc<Application>(id).valueChanges();
  }

  public withdrawApplication(id: string): Promise<void> {
    return this.afs.collection('applications').doc(id).update({ withdrawn: true, status: 'withdrawn' });
  }

  public reopenApplication(id: string): Promise<void> {
    return this.afs.collection('applications').doc(id).update({ withdrawn: false, status: 'submitted' });
  }

  public createApplication(application: Application): Promise<void> {
    return this.afs.collection('applications').doc(application.id).set(application);
  }
}
