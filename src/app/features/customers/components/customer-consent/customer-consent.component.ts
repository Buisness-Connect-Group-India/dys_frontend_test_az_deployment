import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { CustomColumn } from '../../../../shared/column-settings/models/custom-column.model';
import { ColumnCustomizerService } from '../../../../shared/column-settings/services/column-customizer.service';
import { ConfirmationModalService } from '../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { CustomerProductsFormComponent } from '../customer-products/customer-products-form/customer-products-form.component';
import { PaginationService } from '../../../../shared/pagination-footer/services/pagination.service';
import { PaginationState } from '../../../../shared/pagination-footer/models/pagination.model';
import { CustomerAddressesGetDto } from '../customer-addresses/models/custome-addresses.model';
import { CustomerConsentService } from './services/customer-consent.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerConsentGetDto } from './models/customer-consent.model';

@Component({
  selector: 'app-customer-consent',
  standalone: false,
  templateUrl: './customer-consent.component.html',
  styleUrl: './customer-consent.component.scss'
})
export class CustomerConsentComponent {
  OperationType = OperationType;
  searchValue: string = '';
  filterValue: string | null = null;
  pagination: PaginationState;
  customerId: any;
  searchVisible: boolean = false;
  tableColumns: CustomColumn[] = [
    {
      name: 'Type',
      key: 'type',
      value: 'type',
      width: 200,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'Date & Time',
      key: 'dateTime',
      value: 'dateTime',
      width: 200,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'Updated By',
      key: 'updatedBy',
      value: 'updatedBy',
      width: 200,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'Status',
      key: 'status',
      value: 'status',
      width: 200,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    }
  ];
  originalCustomerConcent: CustomerConsentGetDto[] = [];
  customerConsent: CustomerConsentGetDto[] = [];

  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    private confirmationModalService: ConfirmationModalService,
    public columnCustomizerService: ColumnCustomizerService,
    private customerConsentService: CustomerConsentService,
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
    this.customerId = this.activeRoute.parent?.snapshot.paramMap.get('customerId');
    if (this.customerId) {
      this.fetchCustomerConcent();
    }
  }

  openForm(type: OperationType, technicianData?: any): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add Product',
      [OperationType.Edit]: 'Edit Product',
      [OperationType.View]: 'Product Information',
      [OperationType.MassUpload]: 'Branch Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '60%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type] || 'Product Information',
      nzContent: isMassUpload ? BulkUploadComponent : CustomerProductsFormComponent,
      nzData: {
        type,
        data: technicianData || {}
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchCustomerConcent();
      }
    });
  }

  fetchCustomerConcent(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.customerConsentService.getByCodeParams<CustomerAddressesGetDto[]>(this.customerId, { pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalCustomerConcent = data.map((c: any) => ({
            ...c,
            customerName: [c.salutation, c.firstName, c.lastName]
              .filter(Boolean)
              .join(' ')
              .trim()
          }));
          this.customerConsent = [...this.originalCustomerConcent];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching customer addresses:', err)
    });
  }

  async deleteCustomerAddress(item: any) {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.BRANCH];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);

    if (confirmed) {
      console.log('call delete technician api here');
    } else {
      console.log('Deletion cancelled');
    }
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

  exportAs(format: 'PDF' | 'EXCEL'): void {
    console.log(`Exporting as ${format}`);
  }
}
