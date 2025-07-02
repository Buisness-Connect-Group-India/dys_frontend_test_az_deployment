import { Component, Input, SimpleChanges } from '@angular/core';
import { DropdownService } from '../../services/dropdown.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-dropdown',
  standalone: false,
  templateUrl: './dynamic-dropdown.component.html',
  styleUrl: './dynamic-dropdown.component.scss'
})
export class DynamicDropdownComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() dropdownType!: string;
  @Input() sourceType!: string;
  @Input() valueKey !: string;
  @Input() labelKey !: string;
  @Input() required = false;
  @Input() parentValue?: string;

  dataList: any[] = [];

  constructor(private dropdownService: DropdownService) { }

  ngOnInit(): void {
    this.fetchDropDown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentValue'] && !changes['parentValue'].firstChange) {
      this.fetchDropDown();
      this.formGroup.get(this.controlName)?.reset();
    }
  }

  fetchDropDown(): void {
    const type = this.dropdownType?.toUpperCase();
    const source = this.sourceType?.toUpperCase();

    if (!type || !source) {
      console.warn('Invalid dropdown type or sourceType');
      this.dataList = [];
      return;
    }

    switch (source) {
      case 'INDIVIDUAL':
      default:
        this.dropdownService.getDropdownOptionsByType(type.toLowerCase()).subscribe({
          next: res => this.dataList = this.formatDataList(res),
          error: err => {
            console.error(`Error fetching dropdown options for ${type}:`, err);
            this.dataList = [];
          }
        });
        break;

      case 'PARENT':
        this.dropdownService.getParentDropdownOptions(type).subscribe({
          next: res => {
            if (res.status === 'SUCCESS') {
              this.dataList = res.payload;
            } else {
              this.dataList = [];
            }
          },
          error: err => {
            console.error(`Error fetching static dropdown for ${type}:`, err);
            this.dataList = [];
          }
        });
        break;

      case 'CHILD':
        if (!this.parentValue) {
          console.warn(`Missing parent value for child dropdown of type ${type}`);
          this.dataList = [];
          return;
        }
        this.dropdownService.getChildOptionsByParent(type, this.parentValue).subscribe({
          next: res => this.dataList = res,
          error: err => {
            console.error(`Error fetching child dropdown for ${type}:`, err);
            this.dataList = [];
          }
        });
        break;
    }
  }

  formatDataList(data: any[]): any[] {
    return data.map(item => ({
      ...item,
      [this.labelKey]: this.formatLabel(item[this.labelKey])
    }));
  }

  formatLabel(value: string): string {
    return value?.replace(/_/g, ' ').toUpperCase() || '';
  }
}