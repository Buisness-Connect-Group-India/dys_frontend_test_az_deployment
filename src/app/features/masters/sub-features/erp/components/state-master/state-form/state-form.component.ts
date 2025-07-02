import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { StateService } from '../services/state.service';
import { StatePostDto } from '../models/state.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-state-form',
  standalone: false,
  templateUrl: './state-form.component.html',
  styleUrl: './state-form.component.scss'
})
export class StateFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  stateForm!: FormGroup;
  data: StatePostDto;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private messageService: NzMessageService,
    private stateService: StateService,
    @Inject(NZ_DRAWER_DATA) public drawerData: any
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.stateForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.stateForm = this.fb.group({
      stateCode: ['', Validators.required],
      stateName: ['', Validators.required],
      countryCode: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.stateForm.invalid) {
      this.stateForm.markAllAsTouched();
      return;
    }
    const formData = this.stateForm.value;
    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.stateService.create(formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.messageService.create("success", res.message);
            this.drawerRef.close(true);
            this.onReset();
          }else{
            this.messageService.create("error", res.message);
          }
        },
        error: (error) => {
          this.messageService.create("error", error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    } else if (this.operationType === OperationType.Edit) {
      this.stateService.update(this.data.stateCode, formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.messageService.create("success", res.message);
            this.drawerRef.close(true);
            this.onReset();
          }
        },
        error: (error) => {
          console.error('Update failed', error);
          this.messageService.create("error", error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }

  onReset(): void {
    this.stateForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}