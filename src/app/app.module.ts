import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { EnterDataComponent } from './pages/enter-data/enter-data.component';
import { FirestoreTableComponent } from './pages/firestore-table/firestore-table.component';
import { RealtimeTableComponent } from './pages/realtime-table/realtime-table.component';
import { Page404Component } from './pages/page404/page404.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EnterDataComponent,
    FirestoreTableComponent,
    RealtimeTableComponent,
    Page404Component,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
