import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../core/services/base-crud.service';
import { CustomerProductsGetDto } from '../models/customer-products.model';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerProductsService extends BaseCrudService<CustomerProductsGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['CUSTOMER_PRODUCTS'])
  }

}