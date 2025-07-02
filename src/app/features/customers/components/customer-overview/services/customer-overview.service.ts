import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../core/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../core/constants/api-endpoints.constant';
import { CustomerOverviewDto } from '../models/customer-overview.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerOverviewService extends BaseCrudService<CustomerOverviewDto>{

  constructor(http:HttpClient) {
    super(http , API_ENDPOINTS['CUSTOMER_OVERVIEW'])
   }
}
