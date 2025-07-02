import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { EngineerService } from '../services/engineer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-engineer-form',
  standalone: false,
  templateUrl: './engineer-form.component.html',
  styleUrl: './engineer-form.component.scss'
})
export class EngineerFormComponent {
  OperationType = OperationType;
  engineerForm!: FormGroup;
  operationType: OperationType;
  isSubmitting: boolean = false;

  contractorOptions = [
    { label: 'ABC Services Pvt Ltd', value: 'CTR-ABC' },
    { label: 'XYZ Maintenance Co.', value: 'CTR-XYZ' },
    { label: 'QuickFix Solutions', value: 'CTR-QFS' },
    { label: 'ProTech Engineers', value: 'CTR-PTE' },
    { label: 'Elite Repair Hub', value: 'CTR-ERH' }
  ];

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    @Inject(NZ_DRAWER_DATA) public drawerData: { type: OperationType; data: any },
    private engineerService: EngineerService,
    private messageService: NzMessageService
  ) { this.operationType = this.drawerData.type }

  ngOnInit(): void {
    this.engineerForm = this.fb.group({
      branchCode: [this.drawerData?.data?.branch],
      contractor: [this.drawerData?.data?.contractor],
      dynamicFields: this.fb.array([])
    });

    this.addFieldGroup()
  }

  get dynamicFields(): FormArray<FormGroup> {
    return this.engineerForm.get('dynamicFields') as FormArray<FormGroup>;
  }

  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  addFieldGroup(): void {
    const group = this.fb.group({
      isSelected: [false],
      engName: [null],
      idCardNo: [null],
      techCode: [null],
      mobileNo: [null],
      skillLevel: [null]
    });
    this.dynamicFields.push(group);
  }

  removeFieldGroup(index: number): void {
    const fieldArray = this.engineerForm.get('dynamicFields') as FormArray;
    if (fieldArray.length > 1) {
      fieldArray.removeAt(index);
    } else {
      fieldArray.at(0).reset();
    }
  }

  removeSelectedGroups(): void {
    const formArray = this.engineerForm.get('dynamicFields') as FormArray;
    const remainingGroups = formArray.controls.filter(control => !control.get('isSelected')?.value);

    if (remainingGroups.length === 0) {
      return;
    }

    const newFormArray = new FormArray<FormGroup>([]);
    remainingGroups.forEach(control => newFormArray.push(control as FormGroup));

    this.engineerForm.setControl('dynamicFields', newFormArray);
  }

  onSubmit(): void {
    if (this.engineerForm.invalid) {
      this.engineerForm.markAllAsTouched();
      return;
    }

    const formData = this.engineerForm.value;
    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.engineerService.create(formData).subscribe({
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
      this.engineerService.update(engineerId, formData).subscribe({
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
    this.engineerForm.reset();
    const dynamicArray = this.engineerForm.get('dynamicFields') as FormArray;
    while (dynamicArray.length !== 0) {
      dynamicArray.removeAt(0);
    }
    this.addFieldGroup();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}
