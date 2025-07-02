import { Component, ViewEncapsulation } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { CityFormComponent } from '../city-form/city-form.component';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { CityService } from '../services/city.service';
import { CityGetDto, CityPostDto } from '../models/city.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';


@Component({
  selector: 'app-city-table',
  standalone: false,
  templateUrl: './city-table.component.html',
  styleUrl: './city-table.component.scss',
})
export class CityTableComponent {
  OperationType = OperationType;
  searchValue = '';
  originalCities: CityGetDto[] = [];
  cities: CityGetDto[] = [];
  pagination: PaginationState;
  filterPanelOpen = false;
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'City Code',
      key: 'cityCode',
      value: 'cityCode',
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
      name: 'City',
      key: 'cityName',
      value: 'cityName',
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
      name: 'State Code',
      key: 'stateCode',
      value: 'stateCode',
      width: 150,
      default: false,
      originalIndex: 0,
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
      name: 'Country Code',
      key: 'countryCode',
      value: 'countryCode',
      width: 150,
      default: false,
      originalIndex: 0,
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
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.countryName.localeCompare(b.countryName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.countryName)
    },
    {
      name: 'Updated By',
      key: 'updatedBy',
      value: 'updatedBy',
      width: 150,
      default: false,
      originalIndex: 0,
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
      originalIndex: 0,
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
  constructor(
    private drawerService: NzDrawerService,
    public sharedService: SharedService,
    private confirmationModalService: ConfirmationModalService,
    public columnCustomizerService: ColumnCustomizerService,
    private messageService: NzMessageService,
    private paginationService: PaginationService,
    private cityService: CityService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchCities();
  }

  fetchCities(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.cityService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalCities = data;
          this.cities = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching cities:', err)
    });
  }

  async deleteCity(item: CityGetDto): Promise<void> {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.CITY];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.cityService.delete(item.cityCode).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'City deleted successfully.');
            this.fetchCities();
          } else {
            this.messageService.error(res.message || 'Failed to delete city.');
          }
        },
        error: (err) => {
          console.error('Delete city error:', err);
          this.messageService.error('An unexpected error occurred while deleting the city.');
        }
      });
    }
  }

  openForm(type: OperationType, cityData?: CityPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New City',
      [OperationType.Edit]: 'Edit City',
      [OperationType.View]: ' City Information',
      [OperationType.MassUpload]: 'City Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '40%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : CityFormComponent,
      nzData: {
        type,
        data: cityData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchCities();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchCities();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchCities();
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