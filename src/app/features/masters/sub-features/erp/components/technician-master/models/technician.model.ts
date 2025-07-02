export interface TechnicianGetDto {
    techCode: string;
    techName: string;
    techCat: string;
    branchCode: string;
    branchName: string;
    custCode: string;
    vendCode: string;
    addr1: string;
    addr2: string;
    addr3: string;
    cityCode: string;
    cityName: string;
    stateCode: string;
    stateName: string;
    countryCode: string;
    countryName: string;
    postCode: string;
    offNo: string;
    extNo: string | null;
    telNo: string | null;
    mobileNo: string;
    faxNo: string | null;
    emailId: string;
    contactPer1: string | null;
    contactPer2: string | null;
    taxNo: string | null;
    balCrLimit: string | null;
    activeStatus: string;
    updatedBy: string;
    updatedOn: string;
}

export interface TechnicianPostDto extends Omit<TechnicianGetDto, 'branchName' | 'cityName' | 'stateName' | 'countryName' | 'telNo' | 'updatedOn'> { } 