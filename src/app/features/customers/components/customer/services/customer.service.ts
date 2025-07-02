import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../core/constants/api-endpoints.constant';
import { CustomerGetDto } from '../models/customer.model';
import { BaseCrudService } from '../../../../../core/services/base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseCrudService<CustomerGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['CUSTOMER']);
  }

}