import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../../../core/constants/api-endpoints.constant';
import { BaseCrudService } from '../../../../../core/services/base-crud.service';
import { CommonCodeGetDto } from '../../common-code/models/common-code.model';

@Injectable({
  providedIn: 'root'
})
export class CommonCodeService extends BaseCrudService<CommonCodeGetDto>{

  constructor(http:HttpClient) { 
    super(http, API_ENDPOINTS['COMMONCODE'])
  }
}