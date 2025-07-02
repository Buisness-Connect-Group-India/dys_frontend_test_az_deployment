import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { StateGetDto } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService extends BaseCrudService<StateGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['STATE']);
  }
}