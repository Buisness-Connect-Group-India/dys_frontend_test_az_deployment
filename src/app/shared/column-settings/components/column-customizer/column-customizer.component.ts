import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CustomColumn } from '../../models/custom-column.model';

@Component({
  selector: 'app-column-customizer',
  standalone: false,
  templateUrl: './column-customizer.component.html',
  styleUrl: './column-customizer.component.scss'
})
export class ColumnCustomizerComponent implements OnChanges, OnInit, OnDestroy {
  @Input() columns: CustomColumn[] = [];
  @Input() isVisible = false;

  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() columnsChange = new EventEmitter<CustomColumn[]>();
  @Output() cancel = new EventEmitter<void>();

  fix: CustomColumn[] = [];
  notFix: CustomColumn[] = [];
  modalWidth = '40%';
  private originalColumns: CustomColumn[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns'] && this.columns) {
      this.originalColumns = JSON.parse(JSON.stringify(this.columns));
      this.initializeColumns();
    }

    if (changes['isVisible'] && this.isVisible) {
      this.initializeColumns();
    }
  }

  initializeColumns(): void {
    this.fix = this.originalColumns.filter(col => col.default && !col.required);
    this.notFix = this.originalColumns.filter(col => !col.default && !col.required);
  }

  drop(event: CdkDragDrop<CustomColumn[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.fix = this.fix.map(col => ({ ...col, default: true }));
    this.notFix = this.notFix.map(col => ({ ...col, default: false }));
  }

  deleteCustom(value: CustomColumn, index: number): void {
    const updatedValue = { ...value, default: false };
    this.notFix = [...this.notFix, updatedValue];
    this.fix = this.fix.filter((_, i) => i !== index);
  }

  addCustom(value: CustomColumn, index: number): void {
    const updatedValue = { ...value, default: true };
    this.fix = [...this.fix, updatedValue];
    this.notFix = this.notFix.filter((_, i) => i !== index);
  }

  confirm(): void {
    const requiredLeft = this.columns.filter(col => col.position === 'left' && col.required);
    const requiredRight = this.columns.filter(col => col.position === 'right' && col.required);
    const result = [...requiredLeft, ...this.fix, ...this.notFix, ...requiredRight];
    this.columnsChange.emit(result);
    this.isVisibleChange.emit(false);
  }

  cancelModal(): void {
    this.cancel.emit();
    this.isVisibleChange.emit(false);
    this.initializeColumns();
  }
  
  ngOnInit(): void {
    this.updateModalWidth();
    window.addEventListener('resize', this.updateModalWidth.bind(this));
  }

  updateModalWidth(): void {
    this.modalWidth = window.innerWidth <= 576 ? '100%' : '40%';
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateModalWidth.bind(this));
  }

}