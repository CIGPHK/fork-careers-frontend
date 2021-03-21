import { Observable } from 'rxjs';
import { Position } from '../positions/position.model';

export interface Application {
  answers: string[];
  availability: any;
  candidate: string;
  date: Date | firebase.default.firestore.Timestamp;
  id: string;
  immigration: boolean;
  interviewMode: string;
  path: string;
  position: string;
  privacy: boolean;
  recruiters: string[];
  referralSource?: string;
  retainprofile: boolean;
  status: string;

  position$?: Observable<Position>;
}
