//Librerias
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { LoginComponent } from './login/login.component';
import { DisplayMontoComponent } from './display-monto/display-monto.component';
import { RuletaComponent } from './ruleta/ruleta.component';
import { JuegaComponent } from './juega/juega.component';


@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    LoginComponent,
    DisplayMontoComponent,
    RuletaComponent,
    JuegaComponent
  ],
  entryComponents:[
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
