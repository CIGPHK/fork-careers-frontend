import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from './position.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  constructor(private afs: AngularFirestore) {}

  public getActivePositions$(): Observable<Position[]> {
    const now = new Date();

    return this.afs
      .collection<Position>('positions', (ref) => ref.where('published', '==', true).where('closed', '!=', true))
      .snapshotChanges()
      .pipe(
        map((positionsRefs) => {
          return positionsRefs
            .map((positionRef) => {
              const data = positionRef.payload.doc.data();
              const id = positionRef.payload.doc.id;
              return { id, ...data };
            })
            .filter((p) => !p.hasDeadline || !p.deadline || moment(p.deadline).isSameOrAfter(moment()));
        })
      );
  }

  public getPosition$(id: string): Observable<Position> {
    return this.afs.collection('positions').doc<Position>(id).valueChanges();
  }
}
