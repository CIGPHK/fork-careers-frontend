import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { AppUser } from '../auth/app-user.model';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'careers-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user$: Observable<AppUser>;
  public userMenu: NbMenuItem[] = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private authService: AuthService, private menuService: NbMenuService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;

    this.menuService
      .onItemClick()
      .pipe(map(({ item: { title } }) => title))
      .subscribe((label) => {
        if (label === 'Log out') {
          this.authService.signOut();
        } else if (label === 'Profile') {
          this.router.navigate(['/profile']);
        }
      });
  }
}
