import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechSchedulingRoutingModule } from './tech-scheduling-routing.module';
import { TechSchedulingPageComponent } from './pages/tech-scheduling-page/tech-scheduling-page.component';


@NgModule({
  declarations: [
    TechSchedulingPageComponent
  ],
  imports: [
    CommonModule,
    TechSchedulingRoutingModule
  ]
})
export class TechSchedulingModule { }
