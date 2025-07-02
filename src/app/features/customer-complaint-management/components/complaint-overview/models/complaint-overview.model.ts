export interface ComplaintOverviewGetDto{
  customer: {
    id: string;
    name: string;
    mobile: string;
    altMobile: string | null;
    email: string;
    type: string;
  };
  service: {
    status: string;
    callerName: string;
    callType: string;
    covType: string;
    repType: string;
    compDesc: string;
    custReq: string;
    receMode: string;
    receBy: string;
    priority: string;
    regBy: string;
    regDate: string; 
    techCode: string | null;
    techName: string | null;
    assignCat: string | null;
    engCode: string | null;
    engName: string | null;
  };
  address: {
    id: string;
    custName: string;
    addr1: string;
    addr2: string;
    addr3: string;
    addr4: string;
    addr5: string;
    landmark: string;
    postalCode: string;
    city: string;
    cityName: string;
    state: string;
    stateName: string;
    country: string;
    countryName: string;
    resiNo: string;
    officeNo: string | null;
    officeExt: string | null;
    faxNo: string | null;
    regBy: string;
    regDate: string; 
  };
  products: {
    id: string;
    prodCode: string;
    prodDesc: string;
    prodSubGrp: string;
    macSrNo: string;
    prodLine: string;
    modelCode: string;
    dop: string; 
  };
}