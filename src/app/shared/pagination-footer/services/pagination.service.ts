import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginationState } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private paginationState = new BehaviorSubject<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
    total: 0
  });

  pagination$ = this.paginationState.asObservable();

  update(state: Partial<PaginationState>) {
    const current = this.paginationState.value;
    this.paginationState.next({ ...current, ...state });
  }

  get current(): PaginationState {
    return this.paginationState.value;
  }

  reset() {
    this.paginationState.next({ pageIndex: 1, pageSize: 10, total: 0 });
  }
}