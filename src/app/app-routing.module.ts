import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';
import { HomeComponent } from './home/home.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';

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
