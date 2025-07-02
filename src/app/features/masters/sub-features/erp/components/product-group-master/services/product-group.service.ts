import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { ProductGroupGetDto } from '../models/product-group.model';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService extends BaseCrudService<ProductGroupGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['PRODUCTGROUP'])
  }
  
}