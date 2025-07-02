import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { CustomColumn } from '../../../../../shared/column-settings/models/custom-column.model';
import { ColumnCustomizerService } from '../../../../../shared/column-settings/services/column-customizer.service';
import { ConfirmationModalService } from '../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { PaginationState } from '../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../shared/pagination-footer/services/pagination.service';
import { SharedService } from '../../../../../shared/services/shared.service';

import { CommonCodeGetDto } from '../models/common-code.model';
import { CommonCodeFormComponent } from '../common-code-form/common-code-form.component';
import { CommonCodeService } from '../services/common-code.service';
import { DynamicFilterField } from '../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-common-code-table',
  standalone: false,
  templateUrl: './common-code-table.component.html',
  styleUrl: './common-code-table.component.scss'
})
export class CommonCodeTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  commonCode: CommonCodeGetDto[] = [];
  filterPanelOpen = false;
  originalCommonCode: CommonCodeGetDto[] = [];
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'ID',
      key: 'id',
      value: 'id',
      width: 150,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.id.localeCompare(b.id),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.id)
    },
    {
      name: 'Code',
      key: 'code',
      value: 'code',
      width: 150,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.code.localeCompare(b.code),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.code)
    },
    {
      name: 'Description',
      key: 'desc',
      value: 'desc',
      width: 150,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.desc.localeCompare(b.desc),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.desc)
    },
    {
      name: 'Status',
      key: 'status',
      value: 'status',
      width: 100,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.status)
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

  
  searchVisible:boolean=false;
  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    private confirmationModalService: ConfirmationModalService,
    public columnCustomizerService: ColumnCustomizerService,
    private commonCodeService: CommonCodeService,
    private messageService: NzMessageService,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
    this.fetchCommonCode();
  }

  ngOnInit(): void {
  }

  fetchCommonCode(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.commonCodeService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalCommonCode = data;
          this.commonCode = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching common code:', err)
    });
  }

  async deleteCommonCode(item: CommonCodeGetDto): Promise<void> {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.COMMON_CODE];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.commonCodeService.delete(item.id).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'common code deleted successfully.');
            this.fetchCommonCode();
          } else {
            this.messageService.error(res.message || 'Failed to delete common code.');
          }
        },
        error: (err) => {
          console.error('Delete coomon code error:', err);
          this.messageService.error('An unexpected error occurred while deleting the common code.');
        }
      });
    }
  }

  openForm(type: OperationType, engineerData: any = {}): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Common Master',
      [OperationType.Edit]: 'Edit Common Master',
      [OperationType.View]: ' Common Master Information',
      [OperationType.MassUpload]: 'Common Master Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '60%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : CommonCodeFormComponent,
      nzData: {
        type,
        data: engineerData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchCommonCode();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchCommonCode();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchCommonCode();
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
