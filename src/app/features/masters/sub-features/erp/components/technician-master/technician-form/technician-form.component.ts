import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { TechnicianService } from '../services/technician.service';
import { TechnicianPostDto } from '../models/technician.model';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-technician-form',
  standalone: false,
  templateUrl: './technician-form.component.html',
  styleUrl: './technician-form.component.scss'
})
export class TechnicianFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  technicianForm!: FormGroup;
  data: TechnicianPostDto;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    @Inject(NZ_DRAWER_DATA) public drawerData: any,
    private technicianService: TechnicianService,
      private messageService: NzMessageService
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.technicianForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.technicianForm = this.fb.group({
      techCode: ['', Validators.required],
      techName: [null, Validators.required],
      techCat: ['', Validators.required],
      branchCode: ['', Validators.required],
      custCode: ['', Validators.required],
      vendCode: ['', Validators.required],
      addr1: ['', Validators.required],
      addr2: ['', Validators.required],
      addr3: [],
      countryCode: ['', Validators.required],
      stateCode: ['', Validators.required],
      cityCode: ['', Validators.required],
      postCode: ['', Validators.required],
      offNo: [],
      extNo: [],
      resNo: [],
      mobileNo: ['', Validators.required],
      faxNo: [],
      emailId: ['', Validators.required],
      contactPer1: ['', Validators.required],
      contactPer2: [],
      taxNo: ['', Validators.required],
      balCrLimit: ['', Validators.required],
      activeStatus: [false]
    });
  }

  loadTechnicianByCode(code: string): void {
    this.technicianService.getByCode(code).subscribe({
      next: (res: any) => {
        if (res.status === 'SUCCESS') {
          this.technicianForm.patchValue(res.payload);
        }
      },
      error: (err: any) => {
        console.error('Failed to fetch technician by code', err);
      }
    });
  }

  onSubmit(): void {
    if (this.technicianForm.invalid) {
      this.technicianForm.markAllAsTouched();
      return;
    }

    const formData = this.technicianForm.value;
    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.technicianService.create(formData).subscribe({
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
      this.technicianService.update(this.data.techCode, formData).subscribe({
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
    this.technicianForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}