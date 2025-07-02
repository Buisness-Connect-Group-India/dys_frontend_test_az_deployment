export interface CustomerOverviewDto {
  custId: string;
  sourceCustId: string;
  ctype: string;
  salutation: string;
  firstName: string;
  middleName: string;
  lastName: string;
  batchNo: string;
  syncToCrm: string;
  regBy: string;
  regByEnt: string;
  status: string;
  updatedBy: string;
  totalRecords?: number; 
  emailId?: string;
  mobileNo?: string;
}