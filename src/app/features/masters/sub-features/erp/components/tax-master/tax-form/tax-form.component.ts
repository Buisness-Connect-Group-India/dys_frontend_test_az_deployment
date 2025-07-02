import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { TaxService } from '../services/tax.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tax-form',
  standalone: false,
  templateUrl: './tax-form.component.html',
  styleUrl: './tax-form.component.scss'
})
export class TaxFormComponent {
  OperationType = OperationType;
  taxForm!: FormGroup;
  operationType: OperationType;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private taxService: TaxService,
    private messageService: NzMessageService,
    @Inject(NZ_DRAWER_DATA) public drawerData: { type: OperationType; data: any }
  ) { this.operationType = this.drawerData.type }

  ngOnInit(): void {
    this.taxForm = this.fb.group({
      branchCode: [this.drawerData?.data?.branch],
      dynamicFields: this.fb.array([])
    });

    this.addFieldGroup()
  }

  get dynamicFields(): FormArray {
    return this.taxForm.get('dynamicFields') as FormArray;
  }

  addFieldGroup(): void {
    const group = this.fb.group({
      isSelected: [false],
      taxNo: [null],
      taxLabel: [null],
      taxPerc: [null],
      fromDate: [null],
      toDate: [null],
    });
    this.dynamicFields.push(group);
  }

  removeFieldGroup(index: number): void {
    const fieldArray = this.taxForm.get('dynamicFields') as FormArray;
    if (fieldArray.length > 1) {
      fieldArray.removeAt(index);
    } else {
      fieldArray.at(0).reset();
    }
  }

  removeSelectedGroups(): void {
    const formArray = this.taxForm.get('dynamicFields') as FormArray;
    const remainingGroups = formArray.controls.filter(control => !control.get('isSelected')?.value);

    if (remainingGroups.length === 0) {
      return;
    }

    const newFormArray = new FormArray<FormGroup>([]);
    remainingGroups.forEach(control => newFormArray.push(control as FormGroup));

    this.taxForm.setControl('dynamicFields', newFormArray);
  }

  onSubmit(): void {
    if (this.taxForm.invalid) {
      this.taxForm.markAllAsTouched();
      return;
    }

    const formData = this.taxForm.value;
    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.taxService.create(formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create('success', res.message);
          }
        },
      error: (error) => {
          this.messageService.create('error', error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    } else if (this.operationType === OperationType.Edit) {
      const engineerId = this.drawerData?.data?.id;
      this.taxService.update(engineerId, formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create('success', res.message);
          }
        },
        error: (error) => {
          console.error('Update failed', error);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }

  onReset(): void {
    this.taxForm.reset();
    const dynamicArray = this.taxForm.get('dynamicFields') as FormArray;
    while (dynamicArray.length !== 0) {
      dynamicArray.removeAt(0);
    }
    this.addFieldGroup();
  }

  onCancel(): void {
    this.drawerRef.close(null);
  }
}