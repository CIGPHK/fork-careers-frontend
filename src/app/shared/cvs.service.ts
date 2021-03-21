import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CvsService {
  constructor(private storage: AngularFireStorage, private sanitizer: DomSanitizer) {}

  public getCvUrlFromStorage$(cvPath: string): Observable<SafeResourceUrl> {
    return this.storage
      .ref(cvPath)
      .getDownloadURL()
      .pipe(map((cvPathUrl: string) => this.sanitizer.bypassSecurityTrustResourceUrl(cvPathUrl)));
  }
}
