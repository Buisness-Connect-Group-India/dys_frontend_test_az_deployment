import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EventSchedulerComponent } from './components/event-scheduler/event-scheduler.component';

const routes: Routes = [
  {
    path: '', component: DashboardPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'events' },
      { path: 'events', component: EventSchedulerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
