import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../core/services/base-crud.service';
import { CustomerAddressesGetDto } from '../models/custome-addresses.model';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressesService extends BaseCrudService<CustomerAddressesGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['CUSTOMER_ADDRESS'])
    
  }
}