import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';
import { BranchGetDto } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService extends BaseCrudService<BranchGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['BRANCH'])
  }
}