import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../core/services/base-crud.service';
import { CustomerConsentGetDto } from '../models/customer-consent.model';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerConsentService extends BaseCrudService<CustomerConsentGetDto> {

  constructor(httP: HttpClient) {
    super(httP, API_ENDPOINTS.CUSTOMER_CONSENT)
  }
}
