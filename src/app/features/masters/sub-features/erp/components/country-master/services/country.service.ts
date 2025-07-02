import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { CountryGetDto } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseCrudService<CountryGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['COUNTRY']);
  }

}