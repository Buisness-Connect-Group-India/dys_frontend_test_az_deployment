import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationState } from '../../models/pagination.model';

@Component({
  selector: 'app-pagination-footer',
  standalone: false,
  templateUrl: './pagination-footer.component.html',
  styleUrl: './pagination-footer.component.scss'
})
export class PaginationFooterComponent {
  @Input() pagination!: PaginationState;
  @Output() pageIndexChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  getStartRecord(): number {
    return (this.pagination.pageIndex - 1) * this.pagination.pageSize + 1;
  }

  getEndRecord(): number {
    return Math.min(this.pagination.pageIndex * this.pagination.pageSize, this.pagination.total);
  } 
}
