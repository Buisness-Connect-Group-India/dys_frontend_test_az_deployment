import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../core/enums/operationtype.enum';
import { CommonCodeService } from '../services/common-code.service';
import { CommonCodeGetDto, CommonCodePostDto } from '../models/common-code.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-common-code-form',
  standalone: false,
  templateUrl: './common-code-form.component.html',
  styleUrl: './common-code-form.component.scss'
})
export class CommonCodeFormComponent implements OnInit {
  OperationType = OperationType;
  commonCodeForm!: FormGroup;
  operationType: OperationType;
  data: CommonCodePostDto;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private commonCodeService: CommonCodeService,
    private messageService: NzMessageService,
    @Inject(NZ_DRAWER_DATA) public drawerData: { type: OperationType; data: CommonCodeGetDto }
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.patchFormData(this.data);
    } else {
      this.addFieldGroup();
    }
  }

  initializeForm() {
    this.commonCodeForm = this.fb.group({
      id: [null],
      dynamicFields: this.fb.array([])
    });
  }

  get dynamicFields(): FormArray {
    return this.commonCodeForm.get('dynamicFields') as FormArray;
  }

  get hasSelected(): boolean {
    return this.dynamicFields.controls.some(ctrl => ctrl.get('isSelected')?.value);
  }

  addFieldGroup(): void {
    const group = this.fb.group({
      isSelected: [false],
      code: [null],
      desc: [null],
      status: [false]
    });
    this.dynamicFields.push(group);
  }

  removeFieldGroup(index: number): void {
    // if (this.dynamicFields.length > 1) {
    this.dynamicFields.removeAt(index);
    // }
  }

  removeSelectedGroups(): void {
    const allGroups = this.dynamicFields.controls;
    const remaining = allGroups.filter(ctrl => !ctrl.get('isSelected')?.value);

    // if (remaining.length === 0) {
    //   return;
    // }

    const newFormArray = this.fb.array([]);
    remaining.forEach((ctrl: any) => newFormArray.push(ctrl));
    this.commonCodeForm.setControl('dynamicFields', newFormArray);
  }

  patchFormData(data: CommonCodePostDto): void {
    this.commonCodeForm.get('id')?.setValue(data.id);

    const group = this.fb.group({
      isSelected: [false],
      code: [data.code],
      desc: [data.desc],
      status: [data.status === 'Y']
    });

    this.dynamicFields.clear();
    this.dynamicFields.push(group);
  }

  onSubmit(): void {
    if (this.commonCodeForm.invalid) {
      this.commonCodeForm.markAllAsTouched();
      return;
    }

    const formData = { ...this.commonCodeForm.value };

    const transformedPayload = formData.dynamicFields.map((field: { code: any; desc: any; status: any }) => ({
      id: formData.id,
      code: field.code,
      desc: field.desc,
      status: field.status ? 'Y' : 'N',
    }));
    if (this.operationType === OperationType.Create) {
      this.commonCodeService.create(transformedPayload).subscribe({
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
      });
    } else {
      this.commonCodeService.update(this.data.code, transformedPayload[0]).subscribe({
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
      });
    }
  }

  onReset(): void {
    this.commonCodeForm.reset();
    this.dynamicFields.clear();
    this.addFieldGroup();
  }

  onCancel(): void {
    this.drawerRef.close(null);
  }
}
