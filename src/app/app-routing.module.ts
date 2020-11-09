import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

// All of my pages
import { FirestoreTableComponent } from './pages/firestore-table/firestore-table.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { RealtimeTableComponent } from './pages/realtime-table/realtime-table.component';

const routes: Routes = [
  // Sooooo when the router checks routes - it will literally increment thru each of these
  // and take the first one it matches without giving a care wtf?!?
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'realtime',
    component: RealtimeTableComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'firestore',
    component: FirestoreTableComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: Page404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
