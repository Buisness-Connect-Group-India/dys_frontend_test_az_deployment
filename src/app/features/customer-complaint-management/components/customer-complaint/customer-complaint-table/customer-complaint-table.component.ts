import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { CONFIRMATION_MODAL_CONTENT } from '../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../core/enums/operationtype.enum';
import { ConfirmationModalService } from '../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../shared/services/shared.service';
import { CustomerComplaintFormComponent } from '../customer-complaint-form/customer-complaint-form.component';
import { Router } from '@angular/router';
import { CustomColumn } from '../../../../../shared/column-settings/models/custom-column.model';
import { ColumnCustomizerService } from '../../../../../shared/column-settings/services/column-customizer.service';
import { PaginationService } from '../../../../../shared/pagination-footer/services/pagination.service';
import { PaginationState } from '../../../../../shared/pagination-footer/models/pagination.model';
import { CustomerFormComponent } from '../../../../customers/components/customer/customer-form/customer-form.component';
import { CustomerComplaintService } from '../services/customer-complaint.service';
import { CustomerComplaintGetDto } from '../models/customer-complaint.model';
import { DynamicFilterField } from '../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-customer-complaint-table',
  standalone: false,
  templateUrl: './customer-complaint-table.component.html',
  styleUrl: './customer-complaint-table.component.scss'
})
export class CustomerComplaintTableComponent implements OnInit {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  isShowGrid: boolean = true;
  selectedTabIndex = 0;
  filterPanelOpen = false;
  selectedItem: any = null;
  originalComplaints: CustomerComplaintGetDto[] = [];
  complaints: CustomerComplaintGetDto[] = [];
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];

  readonly customerComplaintMenuItems: { label: string; icon: string; action: OperationType; target: 'customer' | 'complaint' }[] = [
    { label: 'Customer', icon: 'diff', action: OperationType.Create, target: 'customer' },
    { label: 'Complaint', icon: 'exclamation-circle', action: OperationType.Create, target: 'complaint' },
  ];


  statusOptions = [
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Closed', value: 'Closed' },
    { label: 'Open', value: 'Open' },
    { label: 'Pending', value: 'Pending' }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Service Order No',
      key: 'callId',
      value: 'callId',
      width: 200,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.callId.localeCompare(b.callId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.callId)
    },
    {
      name: 'Priority',
      key: 'priority',
      value: 'priority',
      width: 200,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.priority.localeCompare(b.priority),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.priority)
    },
    {
      name: 'Service Order Date',
      key: 'regDate',
      value: 'regDate',
      width: 250,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.regDate.localeCompare(b.regDate),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.regDate)
    },
    {
      name: 'Customer Name',
      key: 'custName',
      value: 'custName',
      width: 200,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.custName.localeCompare(b.custName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.custName)
    },
    {
      name: 'Call Status',
      key: 'status',
      value: 'status',
      width: 200,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.status)
    },
    {
      name: 'Product',
      key: 'product',
      value: 'product',
      width: 200,
      default: true,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.product.localeCompare(b.product),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.product)
    },
    {
      name: 'Machine Serial No',
      key: 'macSrNo',
      value: 'macSrNo',
      width: 250,
      default: true,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.macSrNo.localeCompare(b.macSrNo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.macSrNo)
    },
    {
      name: 'Call Type',
      key: 'type',
      value: 'type',
      width: 200,
      default: true,
      originalIndex: 6,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.type)
    },
    {
      name: 'Address',
      key: 'address',
      value: 'address',
      width: 200,
      default: true,
      originalIndex: 7,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.address)
    },
    {
      name: 'Complaint Description',
      key: 'desc',
      value: 'desc',
      width: 200,
      default: true,
      originalIndex: 8,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.desc.localeCompare(b.desc),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.desc)
    },
    {
      name: 'Mobile No',
      key: 'mobileNo',
      value: 'mobileNo',
      width: 350,
      default: true,
      originalIndex: 9,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.mobileNo.localeCompare(b.mobileNo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.mobileNo)
    }
  ];

  searchVisible:boolean=false;

  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    public columnCustomizerService: ColumnCustomizerService,
    private confirmationModalService: ConfirmationModalService,
    private customerComplaintService: CustomerComplaintService,
    private paginationService: PaginationService,
    private router: Router) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    const storedGrid = localStorage.getItem('isShowGrid');
    this.isShowGrid = storedGrid !== null ? storedGrid === 'true' : true;
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
          // this.originalComplaints = data;
          this.complaints = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching complaints:', err)
    });
  }


  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
  }

  handleSearchChange(): void {
    const query = this.searchValue.toLowerCase().trim();
    // this.filteredData = this.dataSet.filter(item =>
    //   item.name.toLowerCase().includes(query)
    // );
  }

  openForm(type: OperationType, target: 'customer' | 'complaint', customerData: any = {}): void {
    const isCustomer = type === OperationType.Create && target === 'customer';

    const titles: Partial<Record<OperationType, string>> = {
      [OperationType.Create]: isCustomer ? 'Add New Customer' : 'Add New Complaint',
      [OperationType.Edit]: 'Edit Complaint'
    };

    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isCustomer ? CustomerFormComponent : CustomerComplaintFormComponent,
      nzData: {
        type,
        data: customerData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth('80%'),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchCustomerComplaints();
      }
    });
  }


  async deleteCustomer(item: any) {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.CUSTOMER];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);

    if (confirmed) {
      console.log('call delete customer api here');
    } else {
      console.log('Deletion cancelled');
    }
  }

  exportAs(format: 'PDF' | 'EXCEL'): void {
    console.log(`Exporting as ${format}`);
  }

  setGridView(isGrid: boolean): void {
    this.isShowGrid = isGrid;
    localStorage.setItem('isShowGrid', isGrid.toString());
  }

  toggleViewMore(item: any): void {
    this.selectedItem = item;
    this.router.navigate([`/customer-complaint-management/${item.callId}/complaint-overview`])
  }

  toggleFilterPanel(): void {
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  applyFilter(filters: any) {
    console.log('Filtered Data:', filters);
  }

}