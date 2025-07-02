import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../../../core/services/base-crud.service';
import { BranchGroupGetDto } from '../models/branch-group.model';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../../../core/constants/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class BranchGroupService extends BaseCrudService<BranchGroupGetDto> {

  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS['BRANCHGROUP'])
  }

}