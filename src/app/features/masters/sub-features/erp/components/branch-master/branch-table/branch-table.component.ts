import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { BranchFormComponent } from '../branch-form/branch-form.component';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { BranchGetDto, BranchPostDto } from '../models/branch.model';
import { BranchService } from '../services/branch.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-branch-table',
  standalone: false,
  templateUrl: './branch-table.component.html',
  styleUrl: './branch-table.component.scss'
})
export class BranchTableComponent {
  OperationType = OperationType;
  searchValue: string = '';
  filterValue: string | null = null;
  pagination: PaginationState;
  originalBranch: BranchGetDto[] = [];
  branch: BranchGetDto[] = [];
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  filterPanelOpen = false;
  tableColumns: CustomColumn[] = [
    {
      name: 'Branch Code',
      key: 'branchCode',
      value: 'branchCode',
      width: 200,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.branchCode.localeCompare(b.branchCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.branchCode)
    },
    {
      name: 'Branch Name',
      key: 'branchName',
      value: 'branchName',
      width: 200,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.branchName.localeCompare(b.branchName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.branchName)
    },
    {
      name: 'Branch Type',
      key: 'branchType',
      value: 'branchType',
      width: 200,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.branchType.localeCompare(b.branchType),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.branchType)
    },
    {
      name: 'Company Name',
      key: 'companyName',
      value: 'companyName',
      width: 200,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.companyName.localeCompare(b.companyName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.companyName)
    },
    {
      name: 'Email ID',
      key: 'emailId',
      value: 'emailId',
      width: 200,
      default: true,
      originalIndex: 12,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.emailId.localeCompare(b.emailId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.emailId)
    },
    {
      name: 'Ext. No',
      key: 'extNo',
      value: 'extNo',
      width: 200,
      default: true,
      originalIndex: 10,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.extNo.localeCompare(b.extNo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.extNo)
    },
    {
      name: 'Office Ph. No',
      key: 'telNo',
      value: 'telNo',
      width: 200,
      default: true,
      originalIndex: 9,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'City',
      key: 'cityName',
      value: 'cityName',
      width: 200,
      default: true,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.cityCode.localeCompare(b.cityCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.cityCode)
    },
    {
      name: 'State',
      key: 'stateName',
      value: 'stateName',
      width: 200,
      default: true,
      originalIndex: 6,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'Country',
      key: 'countryName',
      value: 'countryName',
      width: 200,
      default: true,
      originalIndex: 7,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.countryName.localeCompare(b.countryName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.countryName)
    },
    {
      name: 'Address',
      key: 'addr1',
      value: 'addr1',
      width: 200,
      default: true,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.addr1.localeCompare(b.addr1),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.addr1)
    },
    {
      name: 'Postal Code',
      key: 'postCode',
      value: 'postCode',
      width: 200,
      default: true,
      originalIndex: 8,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.postCode.localeCompare(b.postCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.postCode)
    },
    {
      name: 'Fax. No',
      key: 'faxNo',
      value: 'faxNo',
      width: 200,
      default: true,
      originalIndex: 11,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.faxNo.localeCompare(b.faxNo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.faxNo)
    },
    {
      name: 'Status',
      key: 'activeStatus',
      value: 'activeStatus',
      width: 150,
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
      originalIndex: 12,
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
      originalIndex: 12,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedOn.localeCompare(b.updatedOn),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.updatedOn)
    }
  ];
  searchVisible: boolean = false;
  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    private confirmationModalService: ConfirmationModalService,
    public columnCustomizerService: ColumnCustomizerService,
    private branchService: BranchService,
    private messageService: NzMessageService,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchBranch();
  }

  fetchBranch(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.branchService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalBranch = data;
          this.branch = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching branches:', err)
    });
  }

  async deleteBranch(item: BranchGetDto): Promise<void> {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.BRANCH];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.branchService.delete(item.branchCode).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'Branch deleted successfully.');
            this.fetchBranch();
          } else {
            this.messageService.error(res.message || 'Failed to delete branch.');
          }
        },
        error: (err) => {
          console.error('Delete branch error:', err);
          this.messageService.error('An unexpected error occurred while deleting the branch.');
        }
      });
    }
  }

  openForm(type: OperationType, branchData?: BranchPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Branch',
      [OperationType.Edit]: 'Edit Branch',
      [OperationType.View]: 'Branch Information',
      [OperationType.MassUpload]: 'Branch Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '60%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type] || 'Branch Information',
      nzContent: isMassUpload ? BulkUploadComponent : BranchFormComponent,
      nzData: {
        type,
        data: branchData || {}
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchBranch();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchBranch();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchBranch();
  }

  handleSearchChange(): void {
    const query = this.searchValue.toLowerCase().trim();
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