import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { EngineerFormComponent } from '../engineer-form/engineer-form.component';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { EngineerService } from '../services/engineer.service';
import { EngineerGetDto } from '../models/engineer.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-engineer-table',
  standalone: false,
  templateUrl: './engineer-table.component.html',
  styleUrl: './engineer-table.component.scss'
})
export class EngineerTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  engineers: EngineerGetDto[] = [];
  originalEngineers: EngineerGetDto[] = [];
  filterPanelOpen = false;
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Code',
      key: 'engCode',
      value: 'engCode',
      width: 150,
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
      name: 'Name',
      key: 'engName',
      value: 'engName',
      width: 150,
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
      name: 'Id Card No.',
      key: 'idCardNo',
      value: 'idCardNo',
      width: 150,
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
      name: 'Tech Code',
      key: 'techCode',
      value: 'techCode',
      width: 150,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'Tech Name',
      key: 'techCat',
      value: 'techCat',
      width: 150,
      default: true,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
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
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
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
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    }
  ];
  searchVisible:boolean=false;
  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    public columnCustomizerService: ColumnCustomizerService,
    private confirmationModalService: ConfirmationModalService,
    private paginationService: PaginationService,
    private messageService: NzMessageService,
    private engineerService: EngineerService) {
    this.pagination = this.paginationService.current;
    this.fetchEngineer();
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchEngineer();
  }

  fetchEngineer(): void {
    try {
      const { pageIndex, pageSize } = this.paginationService.current;
      this.engineerService.getAll({ pageNumber: pageIndex, pageSize }).subscribe(res => {
        if (res.status === 'SUCCESS') {
          this.originalEngineers = res.payload.data;
          this.engineers = [...this.originalEngineers];
          this.paginationService.update({
            total: res.payload.totalElements!
          });
          this.pagination = this.paginationService.current;
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  openForm(type: OperationType, engineerData: any = {}): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Engineer',
      [OperationType.Edit]: 'Edit Engineer',
      [OperationType.View]: 'Engineer Information',
      [OperationType.MassUpload]: 'Engineer Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '60%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : EngineerFormComponent,
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
        this.fetchEngineer();
      }
    });
  }

  async deleteEngineer(item: any) {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.ENGINEER];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.engineerService.delete(item.engCode).subscribe((res) => {
        if (res.status == 'SUCCESS') {
          this.messageService.create('success', res.message);
        }
        else {
          this.messageService.create('error', res.message);
        }
      })
    }
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchEngineer();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchEngineer();
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