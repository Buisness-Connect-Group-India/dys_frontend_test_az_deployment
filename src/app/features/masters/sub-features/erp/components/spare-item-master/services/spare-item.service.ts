import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { SpareItemGetDto } from '../models/spare-item.model';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class SpareItemService extends BaseCrudService<SpareItemGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['SPAREITEM'])
  }
}
