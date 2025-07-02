import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { AreaService } from '../services/area.service';
import { AreaPostDto } from '../models/area.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-area-master-form',
  standalone: false,
  templateUrl: './area-master-form.component.html',
  styleUrl: './area-master-form.component.scss'
})
export class AreaMasterFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  areaForm!: FormGroup;
  data: AreaPostDto;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private areaService: AreaService,
    private messageService: NzMessageService,
    @Inject(NZ_DRAWER_DATA) public drawerData: any
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.areaForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.areaForm = this.fb.group({
      areaCode: [null, [Validators.required]],
      areaName: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
      stateCode: [null, [Validators.required]],
      cityCode: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.areaForm.invalid) {
      this.areaForm.markAllAsTouched();
      return;
    }

    const formData = this.areaForm.value;
    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.areaService.create(formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.messageService.create('success', res.message);
            this.drawerRef.close(true);
            this.onReset();
          }
        },
        error: (error) => {
          this.messageService.create('error', error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    } else if (this.operationType === OperationType.Edit) {
      this.areaService.update(this.data.areaCode, formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.messageService.create('success', res.message);
            this.onReset();
          }
        },
        error: (error) => {
          this.messageService.create('error', error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }

  onReset(): void {
    this.areaForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}