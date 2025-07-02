import { Component } from '@angular/core';
import { StateFormComponent } from '../state-form/state-form.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { StateService } from '../services/state.service';
import { StateGetDto, StatePostDto } from '../models/state.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-state-table',
  standalone: false,
  templateUrl: './state-table.component.html',
  styleUrl: './state-table.component.scss'
})
export class StateTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  originalStates: StateGetDto[] = [];
  states: StateGetDto[] = [];
  filterPanelOpen = false;
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'State Code',
      key: 'stateCode',
      value: 'stateCode',
      width: 150,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateCode.localeCompare(b.stateCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [
        { text: '29', value: '29' },
        { text: '30', value: '30' }
      ],
      filterFn: (list, item) => list.includes(item.stateCode)
    },
    {
      name: 'State Name',
      key: 'stateName',
      value: 'stateName',
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
      name: 'Country',
      key: 'countryName',
      value: 'countryName',
      width: 150,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.countryName.localeCompare(b.countryName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.countryName)
    },
    {
      name: 'Country Code',
      key: 'countryCode',
      value: 'countryCode',
      width: 150,
      default: false,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.countryCode.localeCompare(b.countryCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [
        { text: 'IN', value: 'IN' },
        { text: 'US', value: 'US' }
      ],
      filterFn: (list, item) => list.includes(item.countryCode)
    },
    {
      name: 'Updated By',
      key: 'updatedBy',
      value: 'updatedBy',
      width: 150,
      default: false,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedBy.localeCompare(b.updatedBy),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [
        { text: 'admin', value: 'admin' },
        { text: 'system', value: 'system' }
      ],
      filterFn: (list, item) => list.includes(item.updatedBy)
    },
    {
      name: 'Updated On',
      key: 'updatedOn',
      value: 'updatedOn',
      width: 150,
      default: false,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => new Date(a.updatedOn).getTime() - new Date(b.updatedOn).getTime(),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [
        { text: 'admin', value: 'admin' },
        { text: 'system', value: 'system' }
      ],
      filterFn: (list, item) => list.includes(item.updatedBy)
    }
  ];

  searchVisible:boolean=false;
  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    public columnCustomizerService: ColumnCustomizerService,
    private confirmationModalService: ConfirmationModalService,
    private stateService: StateService,
    private messageService: NzMessageService,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchStates();
  }

  openForm(type: OperationType, stateData?: StatePostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New State',
      [OperationType.Edit]: 'Edit State',
      [OperationType.View]: 'State Information',
      [OperationType.MassUpload]: 'State Mass Upload'
    };

    const defaultWidth = isMassUpload ? '40%' : '40%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : StateFormComponent,
      nzData: {
        type,
        data: stateData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchStates();
      }
    });
  }


  fetchStates(): void {
    try {
      const { pageIndex, pageSize } = this.paginationService.current;
      this.stateService.getAll({ pageNumber: pageIndex, pageSize }).subscribe(res => {
        if (res.status === 'SUCCESS') {
          this.originalStates = res.payload.data;
          this.states = [...this.originalStates];
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

  async deleteState(item: StatePostDto) {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.STATE];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);

    if (confirmed) {
      this.stateService.delete(item.stateCode).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'State deleted successfully.');
            this.fetchStates();
          } else {
            this.messageService.error(res.message || 'Failed to delete state.');
          }
        },
        error: (err) => {
          console.error('Delete state error:', err);
          this.messageService.error('An unexpected error occurred while deleting the state.');
        }
      });
    }
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchStates();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchStates();
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