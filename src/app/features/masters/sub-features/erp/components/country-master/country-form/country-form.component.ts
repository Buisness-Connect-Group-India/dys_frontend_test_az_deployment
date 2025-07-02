import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { CountryService } from '../services/country.service';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { CountryPostDto } from '../models/country.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-country-form',
  standalone: false,
  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.scss'
})
export class CountryFormComponent {
  OperationType = OperationType;
  countryForm!: FormGroup;
  operationType: OperationType;
  data: CountryPostDto;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private messageService: NzMessageService,
    @Inject(NZ_DRAWER_DATA) public drawerData: any,
    private countryService: CountryService
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.operationType === OperationType.Edit && this.data) {
      this.countryForm.patchValue(this.data);
    }
  }

  initializeForm(): void {
    this.countryForm = this.fb.group({
      countryCode: ['', Validators.required],
      countryName: ['', Validators.required],
      didCode: ['', Validators.required],
      currCode: ['', Validators.required],
      langCode: ['', Validators.required],
      language: ['', Validators.required],
      timeDiff: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched();
      return;
    }
    
    const formData = this.countryForm.value;

    this.isSubmitting = true;
    if (this.operationType === OperationType.Create) {
      this.countryService.create(formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.messageService.create("success", res.message);
            this.drawerRef.close(true);
            this.onReset();
          } else {
            this.messageService.create("error", res.message);
          }
        },
        error: (error) => {
          this.messageService.create('error', error.message);
          console.error('Create failed', error);
        },
        complete: () => this.isSubmitting = false
      });
    } else if (this.operationType === OperationType.Edit) {
      this.countryService.update(this.data.countryCode, formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.messageService.create("success", res.message);
            this.drawerRef.close(true);
            this.onReset();
          }
        },
        error: (error) => {
          this.messageService.create('error', error.message);
          console.error('Update failed', error);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }

  onReset(): void {
    this.countryForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close();
  }
}