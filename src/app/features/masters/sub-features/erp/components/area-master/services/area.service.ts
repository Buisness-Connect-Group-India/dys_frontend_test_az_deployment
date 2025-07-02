import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { AreaGetDto } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService extends BaseCrudService<AreaGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['AREA'])
  }
}