import { Component } from '@angular/core';
import { CountryFormComponent } from '../country-form/country-form.component';
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
import { CountryService } from '../services/country.service';
import { CountryGetDto, CountryPostDto } from '../models/country.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-country-table',
  standalone: false,
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.scss'
})
export class CountryTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  countries: CountryGetDto[] = [];
  originalCountries: CountryGetDto[] = [];
  filterPanelOpen = false;
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Country Code',
      key: 'countryCode',
      value: 'countryCode',
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
      name: 'Country Name',
      key: 'countryName',
      value: 'countryName',
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
      name: 'DID Code',
      key: 'didCode',
      value: 'didCode',
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
      name: 'Currency Code',
      key: 'currCode',
      value: 'currCode',
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
      name: 'Language Code',
      key: 'langCode',
      value: 'langCode',
      width: 150,
      default: false,
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
      name: 'Language',
      key: 'language',
      value: 'language',
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
      name: 'Time Diff',
      key: 'timeDiff',
      value: 'timeDiff',
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
    },
    {
      name: 'Updated By',
      key: 'updatedBy',
      value: 'updatedBy',
      width: 100,
      default: false,
      originalIndex: 7,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedBy.localeCompare(b.updatedBy),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.updatedBy),
      compare: (a: any, b: any) => a.updatedBy.localeCompare(b.updatedBy)
    },
    {
      name: 'Updated On',
      key: 'updatedOn',
      value: 'updatedOn',
      width: 100,
      default: false,
      originalIndex: 8,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedOn.localeCompare(b.updatedOn),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.updatedOn),
      compare: (a: any, b: any) => new Date(a.updatedOn).getTime() - new Date(b.updatedOn).getTime()
    }
  ];
  searchVisible:boolean=false;
  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    private confirmationModalService: ConfirmationModalService,
    public columnCustomizerService: ColumnCustomizerService,
    public countryService: CountryService,
    private paginationService: PaginationService,
    private messageService: NzMessageService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchCountries();
  }

  fetchCountries(): void {
    try {
      const { pageIndex, pageSize } = this.paginationService.current;
      this.countryService.getAll({ pageNumber: pageIndex, pageSize }).subscribe(res => {
        if (res.status === 'SUCCESS') {
          this.originalCountries = res.payload.data;
          this.countries = [...this.originalCountries];
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

  openForm(type: OperationType, countryData?: CountryPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Country',
      [OperationType.Edit]: 'Edit Country',
      [OperationType.View]: ' Country Information',
      [OperationType.MassUpload]: 'Country Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '40%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : CountryFormComponent,
      nzData: { type, data: countryData },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchCountries();
      }
    });
  }

  async deleteCountry(item: CountryGetDto) {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.COUNTRY];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);

    if (confirmed) {
      this.countryService.delete(item.countryCode).subscribe((res) => {
        if (res.status == 'SUCCESS') {
          this.fetchCountries();
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
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
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