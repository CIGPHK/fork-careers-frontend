import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbUserModule,
  NbContextMenuModule,
  NbMenuModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbCardModule,
  NbSpinnerModule,
  NbStepperModule,
  NbDatepickerModule,
  NbIconModule,
  NbActionsModule,
  NbDialogModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PositionsListComponent } from './positions/positions-list/positions-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PositionDetailsComponent } from './positions/position-details/position-details.component';
import { ApplicationDetailsComponent } from './applications/application-details/application-details.component';
import { ApplicationApplyComponent } from './applications/application-apply/application-apply.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ApplicationApplyReferralComponent } from './applications/application-apply/application-apply-referral.component';
import { YesNoDialogComponent } from './shared/yes-no-dialog.component';
import { NgxGoogleAnalyticsModule,NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

const NB_MODULES = [
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule.forRoot(),
  NbDialogModule.forRoot(),
  NbEvaIconsModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule.forRoot(),
  NbSpinnerModule,
  NbStepperModule,
  NbThemeModule.forRoot({ name: 'default' }),
  NbUserModule
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PositionsListComponent,
    LoginComponent,
    RegisterComponent,
    PositionDetailsComponent,
    ApplicationDetailsComponent,
    ApplicationApplyComponent,
    ProfileComponent,
    RequestPasswordComponent,
    ApplicationApplyReferralComponent,
    YesNoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ...NB_MODULES,
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticsKey),
    NgxGoogleAnalyticsRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
