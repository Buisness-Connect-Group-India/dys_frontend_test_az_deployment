import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TechnicianGetDto } from '../models/technician.model';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService extends BaseCrudService<TechnicianGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['TECHNICIAN']);
  }

}