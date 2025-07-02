import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { CityGetDto } from '../models/city.model';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseCrudService<CityGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['CITY'])
  }
  
}