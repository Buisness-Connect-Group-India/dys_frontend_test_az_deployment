import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { RetailerGetDto } from '../models/retailer.model';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class RetailerService extends BaseCrudService<RetailerGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['RETAILERS']);
  }
  
}