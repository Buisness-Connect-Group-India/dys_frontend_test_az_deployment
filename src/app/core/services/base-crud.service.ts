import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { Observable, of } from 'rxjs';
import { CrudEndpoints } from '../constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseCrudService<T> {

  constructor(
    protected http: HttpClient,
    protected endpoints: CrudEndpoints
  ) { }

  getAll(params?: any): Observable<ApiResponse<T[]>> {
    if (!this.endpoints.getAll) {
      console.warn('[BaseCrudService] getAll endpoint is not defined.');
      return of(this.createFallbackResponse<T[]>([]));
    }
    return this.http.get<ApiResponse<T[]>>(this.endpoints.getAll, { params });
  }

  getByCode(code: string | number): Observable<ApiResponse<T>> {
    if (!this.endpoints.getByCode) {
      console.warn('[BaseCrudService] getByCode endpoint is not defined.');
      return of(this.createFallbackResponse<T>(null as unknown as T));
    }
    return this.http.get<ApiResponse<T>>(this.endpoints.getByCode(code));
  }

   getByCodeParams<T>(code:string|number, params?: any): Observable<ApiResponse<T>> {
    if (!this.endpoints.getByCodeParams) {
      console.warn('[BaseCrudService] getBycode params  endpoint is not defined.');
      return of(this.createFallbackResponse<T>(null as unknown as T));
    }
    return this.http.get<ApiResponse<T>>(this.endpoints.getByCodeParams(code),{params});
  
  }

  create(data: Partial<T>): Observable<ApiResponse<T>> {
    if (!this.endpoints.create) {
      console.warn('[BaseCrudService] create endpoint is not defined.');
      return of(this.createFallbackResponse<T>(null as unknown as T));
    }
    return this.http.post<ApiResponse<T>>(this.endpoints.create, data);
  }

  createWithParams<T>(data: Partial<T>, params?: any): Observable<ApiResponse<T>> {
    if (!this.endpoints.createWithParams) {
      console.warn('[BaseCrudService] create endpoint is not defined.');
      return of(this.createFallbackResponse<T>(null as unknown as T));
    }
    return this.http.post<ApiResponse<T>>(this.endpoints.createWithParams, data, { params });
  }

  update(code: string | number, data: Partial<T>): Observable<ApiResponse<T>> {
    if (!this.endpoints.update) {
      console.warn('[BaseCrudService] update endpoint is not defined.');
      return of(this.createFallbackResponse<T>(null as unknown as T));
    }
    return this.http.put<ApiResponse<T>>(this.endpoints.update(code), data);
  }

  delete(code: string | number): Observable<ApiResponse<null>> {
    if (!this.endpoints.delete) {
      console.warn('[BaseCrudService] delete endpoint is not defined.');
      return of(this.createFallbackResponse<null>(null));
    }
    return this.http.delete<ApiResponse<null>>(this.endpoints.delete(code));
  }

  protected createFallbackResponse<R>(data: R): ApiResponse<R> {
    return {
      status: 'FAILURE',
      message: 'Endpoint not defined',
      payload: { data }
    };
  }
} 