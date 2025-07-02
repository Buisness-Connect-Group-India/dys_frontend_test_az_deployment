import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { BranchService } from '../services/branch.service';
import { BranchPostDto } from '../models/branch.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-branch-form',
  standalone: false,
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.scss'
})
export class BranchFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  branchForm!: FormGroup;
  data: BranchPostDto;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private messageService:NzMessageService,
    private branchService: BranchService,
    @Inject(NZ_DRAWER_DATA) public drawerData: any
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.branchForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.branchForm = this.fb.group({
      branchCode: ['', Validators.required],
      branchName: ['', Validators.required],
      branchType: ['', Validators.required],
      companyName: ['', Validators.required],
      countryCode: ['', Validators.required],
      stateCode: ['', Validators.required],
      cityCode: ['', Validators.required],
      addr1: ['', Validators.required],
      addr2: ['', Validators.required],
      addr3: [''],
      postCode: ['', Validators.required],
      telNo: ['', Validators.required],
      extNo: ['', Validators.required],
      faxNo: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      activeStatus: [true]
    });
  }

  onSubmit(): void {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }

    const formData = {
      ...this.branchForm.value,
      activeStatus: this.branchForm.value.activeStatus ? 'Y' : 'N'
    };

    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.branchService.create(formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create('success',res.message);
          }
        },
        error: (error) => {
          this.messageService.create('success',error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    } else if (this.operationType === OperationType.Edit) {
      this.branchService.update(this.data.branchCode, formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create('success',res.message);
          }
        },
        error: (error) => {
          this.messageService.create('success',error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }

  onReset(): void {
    this.branchForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}