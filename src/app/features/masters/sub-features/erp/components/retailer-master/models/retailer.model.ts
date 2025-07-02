export interface RetailerGetDto {
  retailerCode: string;
  retailerName: string;
  contactPer1: string | null;
  addr1: string;
  addr2: string | null;
  addr3: string | null;
  landmark: string | null;
  branchCode: string | null;
  cityCode: string;
  stateCode: string;
  countryCode: string;
  postCode: string;
  resTelNo: string | null;
  offTelNo: string | null;
  offExtnNo: string | null;
  mobileNo: string | null;
  emailId: string;
  altEmailId: string | null;
  fax: string;
  activeStatus: string;
  updatedBy: string;
  updatedOn:string;
}

export interface RetailerPostDto extends Omit<RetailerGetDto,'updatedOn'>{}