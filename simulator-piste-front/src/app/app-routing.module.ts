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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/me', component: MyAccountComponent, canActivate: [AuthGardServiceService] },
  { path: 'user', component: AllUsersComponent, canActivate: [AuthGardServiceService] },
  { path: 'inscription', component: MyInscriptionsComponent, canActivate: [AuthGardServiceService]},
  { path: 'inscription/:inscriptionid/action/:actionid', component: MyActionComponent, canActivate: [AuthGardServiceService]},
  { path: 'inscription/add', component: AddInscriptionComponent, canActivate: [AuthGardServiceService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
