import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { DROPDOWN_ENDPOINTS } from '../../../core/constants/api-endpoints.constant';
import { HttpClient } from '@angular/common/http';

interface DropdownOption {
  value: string;
  text: string;
}

interface DropdownApiResponse {
  status: string;
  message: string;
  payload: DropdownOption[];
}

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  private fetchDropdownOptions(
    endpoint: string,
    payload: any
  ): Observable<DropdownOption[]> {
    return this.http.post<DropdownApiResponse>(endpoint, payload).pipe(
      map(res => {
        if (res.status === 'SUCCESS') {
          return res.payload;
        } else {
          throw new Error(res.message);
        }
      }),
      catchError(err => {
        console.warn('Dropdown fetch failed:', err);
        return of([]);
      })
    );
  }

  getDropdownOptionsByType(type: string): Observable<DropdownOption[]> {
    const endpoint = DROPDOWN_ENDPOINTS['DYNAMIC_DROP_DOWN']?.dropdown;

    if (!endpoint) {
      console.warn(`Dropdown endpoint not configured for type: '${type}'`);
      return of([]);
    }

    return this.fetchDropdownOptions(endpoint, { type });
  }

  getParentDropdownOptions(type: string): Observable<{
    status: 'SUCCESS' | 'FAIL';
    message: string;
    payload: DropdownApiResponse[];
  }> {
    const endpoint = DROPDOWN_ENDPOINTS[type]?.dropdown;

    if (!endpoint) {
      console.warn(`No valid dropdown endpoint configured for type: '${type}'`);
      return of({
        status: 'FAIL' as const,
        message: 'No endpoint found',
        payload: []
      });
    }

    return this.http.get<{
      status: 'SUCCESS' | 'FAIL';
      message: string;
      payload: DropdownApiResponse[];
    }>(endpoint).pipe(
      catchError(err => {
        console.warn('Individual dropdown fetch failed:', err);
        return of({
          status: 'FAIL' as const,
          message: err.message || 'Request failed',
          payload: []
        });
      })
    );
  }

  getChildOptionsByParent(child: string, parentCode: string): Observable<DropdownOption[]> {
    const endpoint = DROPDOWN_ENDPOINTS['DYNAMIC_DROP_DOWN']?.options;

    if (!endpoint) {
      console.warn(`Child-parent dropdown endpoint not configured for child: '${child}'`);
      return of([]);
    }

    return this.fetchDropdownOptions(endpoint, { child, parentCode });
  }
}