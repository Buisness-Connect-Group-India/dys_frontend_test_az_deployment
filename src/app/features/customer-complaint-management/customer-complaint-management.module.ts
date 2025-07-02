import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerComplaintManagementRoutingModule } from './customer-complaint-management-routing.module';
import { CustomerComplaintManagementPageComponent } from './pages/customer-complaint-management-page/customer-complaint-management-page.component';
import { CustomerComplaintTableComponent } from './components/customer-complaint/customer-complaint-table/customer-complaint-table.component';
import { ComplaintOverviewComponent } from './components/complaint-overview/complaint-overview.component';
import { ComplaintActivityComponent } from './components/complaint-activity/complaint-activity.component';
import { ComplaintAttachmentComponent } from './components/complaint-attachment/complaint-attachment.component';
import { ComplaintNotesComponent } from './components/complaint-notes/complaint-notes.component';
import { ComplaintCommunicationComponent } from './components/complaint-communication/complaint-communication.component';
import { NgZorroAntdModule } from '../../shared/ng-zorro-antd/ng-zorro-antd.module';
import { SharedModule } from '../../shared/shared.module';

import { CustomerComplaintFormComponent } from './components/customer-complaint/customer-complaint-form/customer-complaint-form.component';
import { CustomerComplaintDetailsComponent } from './components/customer-complaint-details/customer-complaint-details.component';

@NgModule({
  declarations: [
    CustomerComplaintManagementPageComponent,
    CustomerComplaintTableComponent,
    CustomerComplaintFormComponent,
    ComplaintOverviewComponent,
    ComplaintActivityComponent,
    ComplaintAttachmentComponent,
    ComplaintNotesComponent,
    ComplaintCommunicationComponent,
    CustomerComplaintDetailsComponent,
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    CustomerComplaintManagementRoutingModule,
  ]
})
export class CustomerComplaintManagementModule { }
