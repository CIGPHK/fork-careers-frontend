import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionsListComponent } from './positions/positions-list/positions-list.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PositionDetailsComponent } from './positions/position-details/position-details.component';
import { ApplicationApplyComponent } from './applications/application-apply/application-apply.component';
import { ApplicationDetailsComponent } from './applications/application-details/application-details.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestPasswordComponent } from './request-password/request-password.component';

const routes: Routes = [
  {
    path: 'applications',
    canActivate: [AuthGuard],
    children: [
      { path: 'apply', component: ApplicationApplyComponent, canActivate: [AuthGuard] },
      { path: 'details/:id', component: ApplicationDetailsComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'positions/:id',
    component: PositionDetailsComponent
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'request-password', component: RequestPasswordComponent },
  {
    path: '',
    pathMatch: 'full',
    component: PositionsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
