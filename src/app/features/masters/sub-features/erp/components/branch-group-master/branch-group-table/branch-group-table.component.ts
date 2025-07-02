import { Component } from '@angular/core';
import { BranchGroupFormComponent } from '../branch-group-form/branch-group-form.component';
import { FormBuilder } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BranchGroupService } from '../services/branch-group.service';
import { BranchGroupGetDto, BranchGroupPostDto } from '../models/branch-group.model';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-branch-group-table',
  standalone: false,
  templateUrl: './branch-group-table.component.html',
  styleUrl: './branch-group-table.component.scss'
})
export class BranchGroupTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  filterPanelOpen = false;
  originalBranchGroup: BranchGroupGetDto[] = [];
  branchGroup: BranchGroupGetDto[] = [];
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Branch Group Code',
      key: 'branchGrpCode',
      value: 'branchGrpCode',
      width: 150,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.branchGrpCode.localeCompare(b.branchGrpCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.branchGrpCode)
    },
    {
      name: 'Branch Code',
      key: 'branchCode',
      value: 'branchCode',
      width: 150,
      default: false,
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
      name: 'Branch Name',
      key: 'branchName',
      value: 'branchName',
      width: 150,
      default: true,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.branchName.localeCompare(b.branchName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.branchName)
    },
    {
      name: 'Created By',
      key: 'createdBy',
      value: 'createdBy',
      width: 150,
      default: false,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.createdBy.localeCompare(b.createdBy),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.createdBy)
    },
    {
      name: 'Created At',
      key: 'createdTime',
      value: 'createdTime',
      width: 150,
      default: false,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.createdTime.localeCompare(b.createdTime),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.createdTime)
    },
    {
      name: 'Updated By',
      key: 'updatedBy',
      value: 'updatedBy',
      width: 150,
      default: false,
      originalIndex: 1,
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
      width: 150,
      default: false,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedOn.localeCompare(b.updatedOn),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.updatedOn)
    },
  ];

  searchVisible:boolean=false;
  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    private confirmationModalService: ConfirmationModalService,
    public columnCustomizerService: ColumnCustomizerService,
    private messageService: NzMessageService,
    private branchGroupService: BranchGroupService,
    private paginationService: PaginationService,
    private fb: FormBuilder) {
    this.pagination = this.paginationService.current;
    this.fetchBranchGroup()
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchBranchGroup();
  }

  fetchBranchGroup(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.branchGroupService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalBranchGroup = data;
          this.branchGroup = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching cities:', err)
    });
  }

  async deleteBranchGroup(item: BranchGroupGetDto): Promise<void> {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.BRANCHGROUP];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.branchGroupService.delete(item.branchGrpCode).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'Branch group deleted successfully.');
            this.fetchBranchGroup();
          } else {
            this.messageService.error(res.message || 'Failed to delete branch group.');
          }
        },
        error: (err) => {
          console.error('Delete branch group error:', err);
          this.messageService.error('An unexpected error occurred while deleting the branch group.');
        }
      });
    }
  }

  openForm(type: OperationType, branchGroupData?: BranchGroupPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Branch Group',
      [OperationType.Edit]: 'Edit Branch Group',
      [OperationType.View]: ' Branch Group Information',
      [OperationType.MassUpload]: 'Branch Group Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '30%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : BranchGroupFormComponent,
      nzData: {
        type,
        data: branchGroupData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchBranchGroup();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchBranchGroup();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchBranchGroup();
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