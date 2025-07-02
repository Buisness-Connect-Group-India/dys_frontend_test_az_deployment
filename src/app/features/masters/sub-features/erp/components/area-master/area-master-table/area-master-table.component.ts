import { Component } from '@angular/core';
import { AreaMasterFormComponent } from '../area-master-form/area-master-form.component';
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
import { NzMessageService } from 'ng-zorro-antd/message';
import { AreaService } from '../services/area.service';
import { AreaGetDto, AreaPostDto } from '../models/area.model';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-area-master-table',
  standalone: false,
  templateUrl: './area-master-table.component.html',
  styleUrl: './area-master-table.component.scss'
})
export class AreaMasterTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  filterPanelOpen = false;
  area: AreaGetDto[] = [];
  originalArea: AreaGetDto[] = [];
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Area Code',
      key: 'areaCode',
      value: 'areaCode',
      width: 150,
      default: true,
      originalIndex: 7,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'Area Name',
      key: 'areaName',
      value: 'areaName',
      width: 200,
      default: true,
      originalIndex: 8,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'City Code',
      key: 'cityCode',
      value: 'cityCode',
      width: 150,
      default: false,
      originalIndex: 9,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.cityCode.localeCompare(b.cityCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.cityCode)
    },
    {
      name: 'City',
      key: 'cityName',
      value: 'cityName',
      width: 150,
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
      name: 'State Code',
      key: 'stateCode',
      value: 'stateCode',
      width: 150,
      default: false,
      originalIndex: 10,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateCode.localeCompare(b.stateCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateCode)
    },
    {
      name: 'State',
      key: 'stateName',
      value: 'stateName',
      width: 150,
      default: true,
      originalIndex: 10,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'Country Code',
      key: 'countryCode',
      value: 'countryCode',
      width: 150,
      default: false,
      originalIndex: 11,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.countryCode.localeCompare(b.countryCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.countryCode)
    },
    {
      name: 'Country',
      key: 'countryName',
      value: 'countryName',
      width: 150,
      default: true,
      originalIndex: 11,
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
      width: 150,
      default: false,
      originalIndex: 11,
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
      originalIndex: 11,
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
    private messageService: NzMessageService,
    private areaService: AreaService,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchArea();
  }

  fetchArea(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.areaService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalArea = data;
          this.area = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching area:', err)
    });
  }

  async deleteArea(item: AreaGetDto): Promise<void> {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.AREA];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.areaService.delete(item.areaCode).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'Area deleted successfully.');
            this.fetchArea();
          } else {
            this.messageService.error(res.message || 'Failed to delete area.');
          }
        },
        error: (err) => {
          console.error('Delete area error:', err);
          this.messageService.error('An unexpected error occurred while deleting the area.');
        }
      });
    }
  }

  openForm(type: OperationType, areaData?: AreaPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Area',
      [OperationType.Edit]: 'Edit Area',
      [OperationType.View]: ' Area Information',
      [OperationType.MassUpload]: 'Area Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '40%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : AreaMasterFormComponent,
      nzData: {
        type,
        data: areaData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchArea();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchArea();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchArea();
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