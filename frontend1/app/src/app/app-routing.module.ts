import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegaComponent } from './juega/juega.component';
import { LoginComponent } from './login/login.component';
import { RuletaComponent } from './ruleta/ruleta.component';
import { TimerComponent } from './timer/timer.component';
//import { VigilanteGuard } from './vigilante.guard';

const routes: Routes = [
  {path: "timer", component: TimerComponent},
  {path: "ruleta", component: RuletaComponent},
  {path: "login", component: LoginComponent},
{path: "juega", component: JuegaComponent, /*canActivate:[VigilanteGuard]*/}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
