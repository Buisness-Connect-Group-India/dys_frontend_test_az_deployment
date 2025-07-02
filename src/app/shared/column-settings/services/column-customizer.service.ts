import { Injectable } from '@angular/core';
import { CustomColumn } from '../models/custom-column.model';

@Injectable({
  providedIn: 'root'
})
export class ColumnCustomizerService {
  isCustomizerVisible: boolean = false;

  constructor() { }

  getColumnValue<T>(item: T, column: string): any {
    return (item as any)[column];
  }

  updateColumns(updated: CustomColumn[], tableColumns: CustomColumn[]): CustomColumn[] {
    return tableColumns.map(col => {
      const updatedCol = updated.find(u => u.key === col.key);
      return updatedCol ? { ...col, default: updatedCol.default } : col;
    });
  }

  openCustomizer(): void {
    this.isCustomizerVisible = true;
  }

  closeCustomizer(): void {
    this.isCustomizerVisible = false;
  }
}
