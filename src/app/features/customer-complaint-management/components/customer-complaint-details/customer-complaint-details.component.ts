import { Component } from '@angular/core';
import { PaginationState } from '../../../../shared/pagination-footer/models/pagination.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnCustomizerService } from '../../../../shared/column-settings/services/column-customizer.service';
import { PaginationService } from '../../../../shared/pagination-footer/services/pagination.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { OperationType } from '../../../../core/enums/operationtype.enum';
import { CustomerComplaintService } from '../customer-complaint/services/customer-complaint.service';
import { CustomerComplaintGetDto } from '../customer-complaint/models/customer-complaint.model';

@Component({
  selector: 'app-customer-complaint-details',
  standalone: false,
  templateUrl: './customer-complaint-details.component.html',
  styleUrl: './customer-complaint-details.component.scss'
})
export class CustomerComplaintDetailsComponent {
 pagination: PaginationState;
  searchValue = '';
  // pagination: PaginationState;
  selectedTabIndex = 0;
  filterPanelOpen = false;
  complaintId: any = null;
  selectedItem: any;
  complaints: CustomerComplaintGetDto[] = [];

  readonly customerComplaintSubMenuItems: { label: string; icon: string; action: OperationType }[] = [
    { label: 'Add visit details', icon: 'diff', action: OperationType.Create },
    { label: 'Pending service order', icon: 'clock-circle', action: OperationType.Create },
    { label: 'Cancel service order', icon: 'close-square', action: OperationType.Create },
    { label: 'Tech schedule', icon: 'schedule', action: OperationType.Create }
  ];

  constructor(
    public sharedService: SharedService,
    public columnCustomizerService: ColumnCustomizerService,
    private paginationService: PaginationService,
    private activeRoute: ActivatedRoute,
    private customerComplaintService: CustomerComplaintService,
    private router: Router) {
    this.complaintId = this.activeRoute.snapshot.paramMap.get('complaintId') || '';
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchCustomerComplaints();
  }

  fetchCustomerComplaints(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    const payload = {
      "callId": "",
      "custId": "",
      "prodId": "",
      "custName": "",
      "mobileNo": ""
    }

    this.customerComplaintService.createWithParams(payload, { pageNumber: pageIndex, pageSize }).subscribe({
      next: (res: any) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          console.log(data);
          // this.originalComplaints = data;
          this.complaints = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching complaints:', err)
    });
  }

  navigateBackToComplaints(item: any): void {
    this.router.navigate([`/customer-complaint-management/customer-complaint`])
  }

  viewDetails(item: any) {
    this.selectedItem = item;
    this.complaintId = item.callId;
    this.router.navigate([`/customer-complaint-management/${item.callId}/complaint-overview`])
    //  const url = `/customer-complaint-management/${item.callId}/complaint-overview`;
    // window.open(url, '_blank'); 
    this.onTabChange(0);
  }
// selectedTabIndex = 0;
selectedTabLabel = 'Overview';

selectTab(index: number, label: string): void {
  this.selectedTabIndex = index;
  this.selectedTabLabel = label;
}

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    const tabRoutes = [
      'complaint-overview',
      'complaint-activity',
      'complaint-attachment',
      'complaint-notes',
      'complaint-communication'
    ];
    this.router.navigate([`/customer-complaint-management/${this.complaintId}/`, tabRoutes[index]]);
  }
}
