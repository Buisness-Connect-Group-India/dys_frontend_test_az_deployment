import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { ConfirmationModalService } from '../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../shared/services/shared.service';
import { ColumnCustomizerService } from '../../../../../shared/column-settings/services/column-customizer.service';
import { CustomColumn } from '../../../../../shared/column-settings/models/custom-column.model';
import { Router } from '@angular/router';
import { PaginationService } from '../../../../../shared/pagination-footer/services/pagination.service';
import { PaginationState } from '../../../../../shared/pagination-footer/models/pagination.model';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerService } from '../services/customer.service';
import { CustomerGetDto } from '../models/customer.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DynamicFilterField } from '../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-customer-table',
  standalone: false,
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss'
})
export class CustomerTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  filterPanelOpen = false;
  originalCustomer: CustomerGetDto[] = [];
  customer: CustomerGetDto[] = [];
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Customer ID',
      key: 'custId',
      value: 'custId',
      width: 150,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.custId.localeCompare(b.custId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.custId)
    },
    {
      name: 'Customer Type',
      key: 'cType',
      value: 'cType',
      width: 150,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.cType.localeCompare(b.cType),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.cType)
    },
    {
      name: 'Name',
      key: 'name',
      value: 'name',
      width: 150,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.name)
    },
    {
      name: 'Mobile No.',
      key: 'mobileNo',
      value: 'mobileNo',
      width: 150,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.mobileNo.localeCompare(b.mobileNo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.mobileNo)
    },
    {
      name: 'Email ID',
      key: 'emailId',
      value: 'emailId',
      width: 150,
      default: true,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.emailId.localeCompare(b.emailId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.emailId)
    },
    {
      name: 'Source ID',
      key: 'sourceCustId',
      value: 'sourceCustId',
      width: 150,
      default: true,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.sourceCustId.localeCompare(b.sourceCustId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.sourceCustId)
    },
    {
      name: 'Batch No.',
      key: 'batchNo',
      value: 'batchNo',
      width: 150,
      default: true,
      originalIndex: 6,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.batchNo.localeCompare(b.batchNo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.batchNo)
    },
    {
      name: 'Status',
      key: 'status',
      value: 'status',
      width: 150,
      default: true,
      originalIndex: 7,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.status)
    }
  ];
  searchVisible:boolean=false;
  constructor(
    private drawerService: NzDrawerService,
    public sharedService: SharedService,
    public columnCustomizerService: ColumnCustomizerService,
    private confirmationModalService: ConfirmationModalService,
    private customerService: CustomerService,
    private messageService: NzMessageService,
    private paginationService: PaginationService,
    private router: Router
  ) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchCustomer();
  }

  fetchCustomer(): void {
    const { pageIndex, pageSize } = this.paginationService.current;

    this.customerService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res?.status === 'SUCCESS' && res.payload) {
          const { data = [], totalElements = 0 } = res.payload;

          this.originalCustomer = data.map(c => ({
            ...c,
            name: [c.salutation, c.firstName, c.middleName, c.lastName]
              .filter(Boolean)
              .join(' ')
              .trim()
          }));

          this.customer = [...this.originalCustomer];
          
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => {
        console.error('Error fetching customer:', err);
      }
    });
  }

  openForm(type: OperationType, customerData: any = {}): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Customer',
      [OperationType.Edit]: 'Edit Customer',
      [OperationType.View]: 'Customer Information',
      [OperationType.MassUpload]: 'Customer Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '80%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : CustomerFormComponent,
      nzData: {
        type,
        data: customerData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchCustomer();
      }
    });
  }

  async deleteCustomer(item: CustomerGetDto) {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.CUSTOMER];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);

    // if (confirmed) {
    //     this.customerService.delete(item.custId).subscribe({
    //       next: (res) => {
    //         if (res.status === 'SUCCESS') {
    //           this.messageService.success(res.message || 'Branch group deleted successfully.');
    //           this.fetchCustomer();
    //         } else {
    //           this.messageService.error(res.message || 'Failed to delete branch group.');
    //         }
    //       },
    //       error: (err) => {
    //         console.error('Delete branch group error:', err);
    //         this.messageService.error('An unexpected error occurred while deleting the branch group.');
    //       }
    //     });
    // }
  }


  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchCustomer();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchCustomer();
  }

  handleSearchChange(): void {
    const query = this.searchValue.toLowerCase().trim();
  }

  exportAs(format: 'PDF' | 'EXCEL'): void {
    console.log(`Exporting as ${format}`);
  }

  viewDetails(item: any): void {
    this.router.navigate(['/customers', item.custId]);
    
  }

  toggleFilterPanel(): void {
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  applyFilter(filters: any) {
    console.log('Filtered Data:', filters);
  }
}