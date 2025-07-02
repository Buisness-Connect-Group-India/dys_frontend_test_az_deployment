import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { TaxGetDto } from '../models/tax.model';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class TaxService extends BaseCrudService<TaxGetDto> {

  constructor(http:HttpClient) { 
     super(http,API_ENDPOINTS['TAXES'])
  }
}
