import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { PollComponent } from './components/poll/poll.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginGuard } from './guards/login.guard';


const routes:Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'friendslist', component: FriendsListComponent, canActivate:[LoginGuard]},
  { path: 'newpoll', component: PollComponent, canActivate:[LoginGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
