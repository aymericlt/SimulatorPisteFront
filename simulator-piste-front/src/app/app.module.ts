import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AuthGardServiceService } from './services/auth-gard-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { MyInscriptionsComponent } from './components/my-inscriptions/my-inscriptions.component';
import { MyActionComponent } from './components/my-action/my-action.component';
import { AddInscriptionComponent } from './components/add-inscription/add-inscription.component';
import { AllActionsComponent } from './components/all-actions/all-actions.component';
import { ModifyActionComponent } from './components/modify-action/modify-action.component';
import { CreateActionComponent } from './components/create-action/create-action.component';
import { AllMissionsComponent } from './components/all-missions/all-missions.component';
import { ModifyMissionComponent } from './components/modify-mission/modify-mission.component';
import { CreateMissionComponent } from './components/create-mission/create-mission.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    MyAccountComponent,
    AllUsersComponent,
    MyInscriptionsComponent,
    MyActionComponent,
    AddInscriptionComponent,
    AllActionsComponent,
    ModifyActionComponent,
    CreateActionComponent,
    AllMissionsComponent,
    ModifyMissionComponent,
    CreateMissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGardServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
