import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { ProductsGetDto } from '../models/products.model';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseCrudService<ProductsGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['PRODUCT'])
  }
}