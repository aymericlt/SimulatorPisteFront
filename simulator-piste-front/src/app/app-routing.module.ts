import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AuthGardServiceService } from './services/auth-gard-service.service';
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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/me', component: MyAccountComponent, canActivate: [AuthGardServiceService] },
  { path: 'user', component: AllUsersComponent, canActivate: [AuthGardServiceService] },
  { path: 'inscription', component: MyInscriptionsComponent, canActivate: [AuthGardServiceService]},
  { path: 'inscription/:inscriptionid/action/:actionid', component: MyActionComponent, canActivate: [AuthGardServiceService]},
  { path: 'inscription/add', component: AddInscriptionComponent, canActivate: [AuthGardServiceService]},
  { path: 'action', component: AllActionsComponent, canActivate: [AuthGardServiceService] },
  { path: 'action/:actionid', component: ModifyActionComponent, canActivate: [AuthGardServiceService] },
  { path: 'createaction', component: CreateActionComponent, canActivate: [AuthGardServiceService] },
  { path: 'mission', component: AllMissionsComponent, canActivate: [AuthGardServiceService] },
  { path: 'mission/:missionid', component: ModifyMissionComponent, canActivate: [AuthGardServiceService] },
  { path: 'createmission', component: CreateMissionComponent, canActivate: [AuthGardServiceService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
