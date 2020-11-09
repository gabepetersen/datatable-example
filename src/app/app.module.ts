// Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Fire Imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
var angularFireMisc = [AngularFirestoreModule, AngularFireDatabaseModule, AngularFireAuthModule, AngularFireAuthGuardModule];

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
var angularMatMisc = [MatTableModule, MatPaginatorModule, MatSortModule];

// App Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

// Misc Page Components
import { LoginComponent } from './pages/login/login.component';
import { FirestoreTableComponent } from './pages/firestore-table/firestore-table.component';
import { RealtimeTableComponent } from './pages/realtime-table/realtime-table.component';
import { Page404Component } from './pages/page404/page404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
var pageComponents = [LoginComponent, FirestoreTableComponent, RealtimeTableComponent, Page404Component, NavbarComponent];



@NgModule({
  declarations: [
    AppComponent,
    ...pageComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // forms stuff
    FormsModule,
    ReactiveFormsModule,
    // angular fire stuff
    AngularFireModule.initializeApp(environment.firebase),
    ...angularFireMisc,
    // angular material stuff
    ...angularMatMisc
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
