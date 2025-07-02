import { Injectable } from '@angular/core';
import { OperationType } from '../../core/enums/operationtype.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly createMenuItems: { label: string; icon: string; action: OperationType }[] = [
    { label: 'Create New', icon: 'diff', action: OperationType.Create },
    { label: 'Mass Upload', icon: 'cloud-upload', action: OperationType.MassUpload }
  ];

  readonly exportOptions: { label: 'PDF' | 'EXCEL'; icon: string }[] = [
    { label: 'PDF', icon: 'file-pdf' },
    { label: 'EXCEL', icon: 'file-excel' }
  ];

  constructor() { }


  isMobile(): boolean {
    return window.innerWidth <= 576;
  }

  getDrawerWidth(defaultWidth: string): string {
    return this.isMobile() ? '100%' : defaultWidth;
  }

}