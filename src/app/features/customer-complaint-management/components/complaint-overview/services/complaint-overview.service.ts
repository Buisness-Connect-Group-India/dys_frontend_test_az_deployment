import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../../core/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../../core/constants/api-endpoints.constant';
import { ComplaintOverviewGetDto } from '../models/complaint-overview.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintOverviewService extends BaseCrudService <ComplaintOverviewGetDto> {

  constructor(http:HttpClient) { 
    super(http,API_ENDPOINTS['COMPLAINT_OVERVIEW'])
  }
}
