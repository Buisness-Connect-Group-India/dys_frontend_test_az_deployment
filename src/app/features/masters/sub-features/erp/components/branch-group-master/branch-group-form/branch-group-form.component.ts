import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { BranchGroupPostDto } from '../models/branch-group.model';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { BranchGroupService } from '../services/branch-group.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-branch-group-form',
  standalone: false,
  templateUrl: './branch-group-form.component.html',
  styleUrl: './branch-group-form.component.scss'
})
export class BranchGroupFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  branchGroupForm!: FormGroup;
  data: BranchGroupPostDto;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private branchGroupService: BranchGroupService,
    private messageService: NzMessageService,
    @Inject(NZ_DRAWER_DATA) public drawerData: any
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.branchGroupForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.branchGroupForm = this.fb.group({
      branchGrpCode: [null, [Validators.required]],
      branchCode: [null, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.branchGroupForm.invalid) {
      this.branchGroupForm.markAllAsTouched();
      return;
    }

    const formData = this.branchGroupForm.value;
    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.branchGroupService.create(formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create("success", res.message);
          }
        },
        error: (error) => {
          this.messageService.create("error", error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    } else if (this.operationType === OperationType.Edit) {
      this.branchGroupService.update(this.data.branchGrpCode, formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create("success", res.message);
          }
        },
        error: (error) => {
          this.messageService.create("error", error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }

  onReset(): void {
    this.branchGroupForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}