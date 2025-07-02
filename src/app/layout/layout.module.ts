import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgZorroAntdModule } from '../shared/ng-zorro-antd/ng-zorro-antd.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
  ]
})
export class LayoutModule { }
