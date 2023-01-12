import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountdownComponent } from './timer-countdown/timer-countdown.component';
import { HomeComponent } from './home/home.component';
import { PomodoroComponent } from './timer-pomodoro/timer-pomodoro.component';
import { StopwatchComponent } from './timer-stopwatch/timer-stopwatch.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent},
  { path: "countdown", component: CountdownComponent},
  { path: "stopwatch", component: StopwatchComponent},
  { path: "pomodoro", component: PomodoroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
