import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { EngineerGetDto } from '../models/engineer.model';

@Injectable({
  providedIn: 'root'
})
export class EngineerService extends BaseCrudService<EngineerGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['ENGINEER']);
  }

}
