import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DynamicFilterField } from '../../models/dynamic-filter.model';

@Component({
  selector: 'app-dynamic-filter',
  standalone: false,
  templateUrl: './dynamic-filter.component.html',
  styleUrl: './dynamic-filter.component.scss'
})
export class DynamicFilterComponent {
  @Input() fields: DynamicFilterField[] = [];
  @Output() filter = new EventEmitter<any>();
  @Output() reset = new EventEmitter<void>();

  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: Record<string, any> = {};

    this.fields.forEach(field => {
      group[field.formControlName] = [
        '',
        field.required ? Validators.required : []
      ];
    });

    this.filterForm = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.filterForm.valid) {
      this.filter.emit(this.filterForm.value);
    } else {
      this.filterForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.filterForm.reset();
    this.reset.emit();
  }
}
