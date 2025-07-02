import { Component } from '@angular/core';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { RetailerFormComponent } from '../retailer-form/retailer-form.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { RetailerGetDto, RetailerPostDto } from '../models/retailer.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RetailerService } from '../services/retailer.service';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-retailer-table',
  standalone: false,
  templateUrl: './retailer-table.component.html',
  styleUrl: './retailer-table.component.scss'
})
export class RetailerTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  retailer: RetailerGetDto[] = [];
  originalRetailer: RetailerGetDto[] = [];
  filterPanelOpen = false;
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Code',
      key: 'retailerCode',
      value: 'retailerCode',
      width: 150,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.retailerCode.localeCompare(b.retailerCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.retailerCode)
    },
    {
      name: 'Name',
      key: 'retailerName',
      value: 'retailerName',
      width: 150,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.retailerName.localeCompare(b.retailerName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.retailerName)
    },
    {
      name: 'Contact Person Name',
      key: 'contactPer1',
      value: 'contactPer1',
      width: 180,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.contactPer1.localeCompare(b.contactPer1),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.contactPer1)
    },
    {
      name: 'Branch',
      key: 'branchCode',
      value: 'branchCode',
      width: 150,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.branchCode.localeCompare(b.branchCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.branchCode)
    },
    {
      name: 'Email Id',
      key: 'emailId',
      value: 'emailId',
      width: 200,
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
      name: 'Mobile No.',
      key: 'mobileNo',
      value: 'mobileNo',
      width: 150,
      default: true,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.mobileNo.localeCompare(b.mobileNo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.mobileNo)
    },
    {
      name: 'Status',
      key: 'activeStatus',
      value: 'activeStatus',
      width: 120,
      default: true,
      originalIndex: 6,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.activeStatus.localeCompare(b.activeStatus),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.activeStatus)
    },
    {
      name: 'Updated By',
      key: 'updatedBy',
      value: 'updatedBy',
      width: 200,
      default: false,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedBy.localeCompare(b.updatedBy),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.updatedBy)
    },
    {
      name: 'Updated On',
      key: 'updatedOn',
      value: 'updatedOn',
      width: 200,
      default: false,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedOn.localeCompare(b.updatedOn),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.updatedOn)
    }
  ];
  searchVisible:boolean=false;
  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    public columnCustomizerService: ColumnCustomizerService,
    private confirmationModalService: ConfirmationModalService,
    private messageService: NzMessageService,
    private retailerService: RetailerService,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchRetailer();
  }

  fetchRetailer(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.retailerService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalRetailer = data;
          this.retailer = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching Retailer:', err)
    });
  }

  async deleteRetailer(item: RetailerGetDto): Promise<void> {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.RETAILER];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.retailerService.delete(item.retailerCode).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'Retailer deleted successfully.');
            this.fetchRetailer();
          } else {
            this.messageService.error(res.message || 'Failed to delete Retailer.');
          }
        },
        error: (err) => {
          console.error('Delete Retailer error:', err);
          this.messageService.error('An unexpected error occurred while deleting the Retailer.');
        }
      });
    }
  }

  openForm(type: OperationType, retailerData?: RetailerPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Retailer',
      [OperationType.Edit]: 'Edit Retailer',
      [OperationType.View]: 'Retailer Information',
      [OperationType.MassUpload]: 'Retailer Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '60%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : RetailerFormComponent,
      nzData: {
        type,
        data: retailerData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchRetailer();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchRetailer();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchRetailer();
  }

  handleSearchChange(): void {
    const query = this.searchValue.toLowerCase().trim();
  }

  exportAs(format: 'PDF' | 'EXCEL'): void {
    console.log(`Exporting as ${format}`);
  }

  toggleFilterPanel(): void {
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  applyFilter(filters: any) {
    console.log('Filtered Data:', filters);
  }
}