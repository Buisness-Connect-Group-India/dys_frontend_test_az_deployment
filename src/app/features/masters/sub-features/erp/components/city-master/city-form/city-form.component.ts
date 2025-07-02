import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { CityService } from '../services/city.service';
import { CityPostDto } from '../models/city.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-city-form',
  standalone: false,
  templateUrl: './city-form.component.html',
  styleUrl: './city-form.component.scss'
})
export class CityFormComponent {
  OperationType = OperationType;
  cityForm!: FormGroup;
  operationType: OperationType;
  data: CityPostDto;
  isSubmitting: boolean = false;

  countryCodeList = [
    { code: 'US' },
    { code: 'CA' },
    { code: 'IN' }
  ];

  stateCodeList = [
    { code: 'CA' },
    { code: 'NY' },
    { code: 'ON' },
    { code: 'BC' },
    { code: 'MH' },
    { code: 'KA' }
  ];

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private cityService: CityService,
    private messageService: NzMessageService,
    @Inject(NZ_DRAWER_DATA) public drawerData: any
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.cityForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.cityForm = this.fb.group({
      cityCode: [null, Validators.required],
      cityName: [null, Validators.required],
      countryCode: [null, Validators.required],
      stateCode: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }
    const formData = this.cityForm.value;
    this.isSubmitting = true;
    if (this.operationType === OperationType.Create) {
      this.cityService.create(formData).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.create("success", res.message);
            this.drawerRef.close(true);
            this.onReset();
          }
        },
        error: (error) => {
          this.messageService.create("error", error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    } else if (this.operationType === OperationType.Edit) {
      this.cityService.update(this.data.cityCode, formData).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.create("success", res.message);
            this.drawerRef.close(true);
            this.onReset();
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
    this.cityForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}