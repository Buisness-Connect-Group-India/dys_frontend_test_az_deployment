import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { BrandGetDto } from '../models/brand.model';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseCrudService<BrandGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['BRAND'])
  }
}
