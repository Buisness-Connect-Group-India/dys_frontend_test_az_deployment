import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { NgZorroAntdModule } from '../../shared/ng-zorro-antd/ng-zorro-antd.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    AuthRoutingModule,
    SharedModule
  ],
})
export class AuthModule { }
