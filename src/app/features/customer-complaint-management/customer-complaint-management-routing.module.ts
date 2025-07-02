import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComplaintTableComponent } from './components/customer-complaint/customer-complaint-table/customer-complaint-table.component';
import { ComplaintOverviewComponent } from './components/complaint-overview/complaint-overview.component';
import { ComplaintActivityComponent } from './components/complaint-activity/complaint-activity.component';
import { ComplaintAttachmentComponent } from './components/complaint-attachment/complaint-attachment.component';
import { ComplaintNotesComponent } from './components/complaint-notes/complaint-notes.component';
import { ComplaintCommunicationComponent } from './components/complaint-communication/complaint-communication.component';
import { CustomerComplaintDetailsComponent } from './components/customer-complaint-details/customer-complaint-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'customer-complaint', pathMatch: 'full' },
  {
    path: 'customer-complaint',
    component: CustomerComplaintTableComponent,
  },
  {
    path: ':complaintId',
    component: CustomerComplaintDetailsComponent,
    children: [
      { path: '', redirectTo: 'complaint-overview', pathMatch: 'full' },
      { path: 'complaint-overview', component: ComplaintOverviewComponent },
      { path: 'complaint-activity', component: ComplaintActivityComponent },
      { path: 'complaint-attachment', component: ComplaintAttachmentComponent },
      { path: 'complaint-notes', component: ComplaintNotesComponent },
      { path: 'complaint-communication', component: ComplaintCommunicationComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerComplaintManagementRoutingModule { }
