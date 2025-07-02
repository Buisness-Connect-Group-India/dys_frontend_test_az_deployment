import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters-routing.module';
import { MasterPageComponent } from './pages/master-page/master-page.component';
import { CommonCodeTableComponent } from './components/common-code/common-code-table/common-code-table.component';
import { CommonCodeFormComponent } from './components/common-code/common-code-form/common-code-form.component';
import { LabelMasterFormComponent } from './components/label-master/label-master-form/label-master-form.component';
import { LabelMasterTableComponent } from './components/label-master/label-master-table/label-master-table.component';
import { NgZorroAntdModule } from '../../shared/ng-zorro-antd/ng-zorro-antd.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MasterPageComponent,
    CommonCodeTableComponent,
    CommonCodeFormComponent,
    LabelMasterFormComponent,
    LabelMasterTableComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    MastersRoutingModule
  ]
})
export class MastersModule { }
