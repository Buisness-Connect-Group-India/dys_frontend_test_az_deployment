import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { ProductLineGetDto } from '../models/product-line.model';

@Injectable({
  providedIn: 'root'
})
export class ProductLineService extends BaseCrudService<ProductLineGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['PRODUCTLINE'])
  }
}
