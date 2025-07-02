import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { CONFIRMATION_MODAL_CONTENT } from '../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { CustomColumn } from '../../../../../shared/column-settings/models/custom-column.model';
import { ColumnCustomizerService } from '../../../../../shared/column-settings/services/column-customizer.service';
import { ConfirmationModalService } from '../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../shared/services/shared.service';
import { BranchFormComponent } from '../../../../masters/sub-features/erp/components/branch-master/branch-form/branch-form.component';
import { CustomerAddressesFormComponent } from '../customer-addresses-form/customer-addresses-form.component';
import { PaginationState } from '../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../shared/pagination-footer/services/pagination.service';
import { CustomerAddressesService } from '../services/customer-addresses.service';
import { CustomerAddressesGetDto } from '../models/custome-addresses.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../customer/services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { DynamicFilterField } from '../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-customer-addresses-table',
  standalone: false,
  templateUrl: './customer-addresses-table.component.html',
  styleUrl: './customer-addresses-table.component.scss'
})
export class CustomerAddressesTableComponent {
  customerId: any;
  OperationType = OperationType;
  searchValue: string = '';
  filterValue: string | null = null;
  pagination: PaginationState;
  originalCustomerAddresses: CustomerAddressesGetDto[] = [];
  customerAddresses: CustomerAddressesGetDto[] = [];
  filterPanelOpen:boolean = false;
  searchVisible:boolean =false;
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Customer Name',
      key: 'customerName',
      value: 'customerName',
      width: 200,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.customerName.localeCompare(b.customerName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.customerName)
    },
    {
      name: 'Mobile No.',
      key: 'mobileNo',
      value: 'mobileNo',
      width: 200,
      default: true,
      originalIndex: 1,
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
      width: 200,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.emailId.localeCompare(b.emailId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.emailId)
    },
    {
      name: 'Address',
      key: 'address',
      value: 'address',
      width: 200,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.address)
    },
    {
      name: 'Type',
      key: 'atype',
      value: 'atype',
      width: 200,
      default: true,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.atype.localeCompare(b.atype),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.atype)
    }
  ];

  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    private confirmationModalService: ConfirmationModalService,
    public columnCustomizerService: ColumnCustomizerService,
    private customerAddressesService: CustomerAddressesService,
    private messageService: NzMessageService,
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
    this.customerId = this.activeRoute.parent?.snapshot.paramMap.get('customerId');
    if (this.customerId) {
      this.fetchCustomerAddresses();
    }
  }

  fetchCustomerAddresses(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.customerAddressesService.getByCodeParams<CustomerAddressesGetDto[]>(this.customerId,{ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalCustomerAddresses = data.map((c:any) => ({
            ...c,
            customerName: [c.salutation, c.firstName, c.lastName]
              .filter(Boolean)
              .join(' ')
              .trim()
          }));
          this.customerAddresses = [...this.originalCustomerAddresses];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching customer addresses:', err)
    });
  }

  async deleteCustomerAddress(item: CustomerAddressesGetDto) {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.CUSTOMER_ADDRESSE];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.customerAddressesService.delete(item.addrId).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'customer address deleted successfully.');
            this.fetchCustomerAddresses();
          } else {
            this.messageService.error(res.message || 'Failed to delete customer address.');
          }
        },
        error: (err) => {
          console.error('Delete customer address error:', err);
          this.messageService.error('An unexpected error occurred while deleting the customer address.');
        }
      });
    }
  }

  openForm(type: OperationType, customerAddressData?: any): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Customer Address',
      [OperationType.Edit]: 'Edit Customer Address ',
      [OperationType.View]: 'Customer Address Information',
      [OperationType.MassUpload]: 'Customer Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '70%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type] || 'Customer Address Information',
      nzContent: isMassUpload ? BulkUploadComponent : CustomerAddressesFormComponent,
      nzData: {
        type,
        data: customerAddressData || {}
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchCustomerAddresses();
      }
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
  toggleFilterPanel(): void {
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  exportAs(format: 'PDF' | 'EXCEL'): void {
    console.log(`Exporting as ${format}`);
  }

  applyFilter(filters: any) {
    console.log('Filtered Data:', filters);
  }


}
