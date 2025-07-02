import { Component } from '@angular/core';
import { TechnicianFormComponent } from '../technician-form/technician-form.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { TechnicianService } from '../services/technician.service';
import { TechnicianGetDto, TechnicianPostDto } from '../models/technician.model';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-technician-table',
  standalone: false,
  templateUrl: './technician-table.component.html',
  styleUrl: './technician-table.component.scss'
})
export class TechnicianTableComponent {

  OperationType = OperationType;
  searchValue: string = '';
  filterValue: string | null = null;
  pagination: PaginationState;
  private originalTechnicians: TechnicianGetDto[] = [];
  technicians: TechnicianGetDto[] = [];
  filterPanelOpen = false;
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Code',
      key: 'techCode',
      value: 'techCode',
      width: 150,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.techCode ?? '').localeCompare(b.techCode ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.techCode)
    },
    {
      name: 'Name',
      key: 'techName',
      value: 'techName',
      width: 350,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.techName ?? '').localeCompare(b.techName ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.techName)
    },
    {
      name: 'Category',
      key: 'techCat',
      value: 'techCat',
      width: 180,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.techCat ?? '').localeCompare(b.techCat ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.techCat)
    },
    {
      name: 'Branch',
      key: 'branchName',
      value: 'branchName',
      width: 180,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.branchName ?? '').localeCompare(b.branchName ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.branchName)
    },
    {
      name: 'Customer Code',
      key: 'custCode',
      value: 'custCode',
      width: 220,
      default: true,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.custCode ?? '').localeCompare(b.custCode ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.custCode)
    },
    {
      name: 'City',
      key: 'cityName',
      value: 'cityName',
      width: 160,
      default: true,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.cityName ?? '').localeCompare(b.cityName ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.cityName)
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
      sortFn: (a, b) => (a.activeStatus ?? '').localeCompare(b.activeStatus ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.activeStatus)
    },
    {
      name: 'Vendor Code',
      key: 'vendCode',
      value: 'vendCode',
      width: 160,
      default: false,
      originalIndex: 7,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.vendCode ?? '').localeCompare(b.vendCode ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.vendCode)
    },
    {
      name: 'Address 1',
      key: 'addr1',
      value: 'addr1',
      width: 160,
      default: false,
      originalIndex: 8,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.addr1 ?? '').localeCompare(b.addr1 ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.addr1)
    },
    {
      name: 'Address 2',
      key: 'addr2',
      value: 'addr2',
      width: 160,
      default: false,
      originalIndex: 9,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.addr2 ?? '').localeCompare(b.addr2 ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.addr2)
    },
    {
      name: 'Address 3',
      key: 'addr3',
      value: 'addr3',
      width: 160,
      default: false,
      originalIndex: 10,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.addr3 ?? '').localeCompare(b.addr3 ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.addr3)
    },
    {
      name: 'City Code',
      key: 'cityCode',
      value: 'cityCode',
      width: 160,
      default: false,
      originalIndex: 11,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.cityCode ?? '').localeCompare(b.cityCode ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.cityCode)
    },
    {
      name: 'State Code',
      key: 'stateCode',
      value: 'stateCode',
      width: 160,
      default: false,
      originalIndex: 12,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.stateCode ?? '').localeCompare(b.stateCode ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateCode)
    },
    {
      name: 'Country Code',
      key: 'countryCode',
      value: 'countryCode',
      width: 160,
      default: false,
      originalIndex: 13,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.countryCode ?? '').localeCompare(b.countryCode ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.countryCode)
    },
    {
      name: 'Postal Code',
      key: 'postCode',
      value: 'postCode',
      width: 160,
      default: false,
      originalIndex: 14,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.postCode ?? '').localeCompare(b.postCode ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.postCode)
    },
    {
      name: 'Office No',
      key: 'offNo',
      value: 'offNo',
      width: 160,
      default: false,
      originalIndex: 15,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.offNo ?? '').localeCompare(b.offNo ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.offNo)
    },
    {
      name: 'Ext No',
      key: 'extNo',
      value: 'extNo',
      width: 160,
      default: false,
      originalIndex: 16,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.extNo ?? '').localeCompare(b.extNo ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.extNo)
    },
    {
      name: 'Residence No',
      key: 'resNo',
      value: 'resNo',
      width: 160,
      default: false,
      originalIndex: 17,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.resNo ?? '').localeCompare(b.resNo ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.resNo)
    },
    {
      name: 'Mobile No',
      key: 'mobileNo',
      value: 'mobileNo',
      width: 160,
      default: false,
      originalIndex: 18,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.mobileNo ?? '').localeCompare(b.mobileNo ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.mobileNo)
    },
    {
      name: 'Fax No',
      key: 'faxNo',
      value: 'faxNo',
      width: 160,
      default: false,
      originalIndex: 19,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.faxNo ?? '').localeCompare(b.faxNo ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.faxNo)
    },
    {
      name: 'Email ID',
      key: 'emailId',
      value: 'emailId',
      width: 200,
      default: false,
      originalIndex: 20,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.emailId ?? '').localeCompare(b.emailId ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.emailId)
    },
    {
      name: 'Contact Person 1',
      key: 'contactPer1',
      value: 'contactPer1',
      width: 180,
      default: false,
      originalIndex: 21,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.contactPer1 ?? '').localeCompare(b.contactPer1 ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.contactPer1)
    },
    {
      name: 'Contact Person 2',
      key: 'contactPer2',
      value: 'contactPer2',
      width: 180,
      default: false,
      originalIndex: 22,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.contactPer2 ?? '').localeCompare(b.contactPer2 ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.contactPer2)
    },
    {
      name: 'Tax Number',
      key: 'taxNo',
      value: 'taxNo',
      width: 160,
      default: false,
      originalIndex: 23,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.taxNo ?? '').localeCompare(b.taxNo ?? ''),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.taxNo)
    },
    {
      name: 'Credit Limit',
      key: 'balCrLimit',
      value: 'balCrLimit',
      width: 160,
      default: false,
      originalIndex: 24,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.balCrLimit ?? 0) - (b.balCrLimit ?? 0),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      filters: [],
      filterFn: (list, item) => list.includes(item.balCrLimit)
    },
    {
      name: 'Updated By',
      key: 'updatedBy',
      value: 'updatedBy',
      width: 160,
      default: false,
      originalIndex: 25,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => (a.updatedBy ?? '').localeCompare(b.updatedBy ?? ''),
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
      originalIndex: 26,
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
    private technicianService: TechnicianService,
    public columnCustomizerService: ColumnCustomizerService,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchTechnicians();
  }

  fetchTechnicians(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.technicianService.getAll({ pageNumber: pageIndex, pageSize }).subscribe(res => {
      if (res.status === 'SUCCESS') {
        this.originalTechnicians = res.payload.data
        this.technicians = [...this.originalTechnicians];
        this.paginationService.update({
          total: res.payload.totalElements!
        });
        this.pagination = this.paginationService.current;
      }
    });
  }

  openForm(type: OperationType, technicianData?: TechnicianPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;
    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Technician',
      [OperationType.Edit]: 'Edit Technician',
      [OperationType.View]: 'Technician Information',
      [OperationType.MassUpload]: 'Technician Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '60%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type] || 'Technician Information',
      nzContent: isMassUpload ? BulkUploadComponent : TechnicianFormComponent,
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
        this.fetchTechnicians();
      }
    });
  }

  async deleteTechnician(item: any) {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.TECHNICIAN];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.technicianService.delete(item.id).subscribe({
        next: () => {
          this.fetchTechnicians();
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    } else {
      console.log('Deletion cancelled');
    }
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchTechnicians();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchTechnicians();
  }

  handleSearchChange(): void {
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