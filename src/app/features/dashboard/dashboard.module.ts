import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EventSchedulerComponent } from './components/event-scheduler/event-scheduler.component';
import { NgZorroAntdModule } from '../../shared/ng-zorro-antd/ng-zorro-antd.module';


@NgModule({
  declarations: [
    DashboardPageComponent,
    EventSchedulerComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
