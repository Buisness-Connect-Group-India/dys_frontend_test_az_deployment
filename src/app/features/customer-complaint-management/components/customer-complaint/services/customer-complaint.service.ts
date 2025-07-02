import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerComplaintGetDto } from '../models/customer-complaint.model';
import { BaseCrudService } from '../../../../../core/services/base-crud.service';
import { API_ENDPOINTS } from '../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerComplaintService extends BaseCrudService<CustomerComplaintGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['CUSTOMER_COMPLAINT']);
  }

}