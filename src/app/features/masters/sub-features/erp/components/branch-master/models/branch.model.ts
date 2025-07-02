export interface BranchGetDto {
    branchCode: string;
    branchName: string;
    branchType: string;
    companyName: string;
    addr1: string;
    addr2: string;
    addr3: string;
    cityCode: string;
    stateCode: string;
    stateName: string;
    countryCode: string;
    countryName: string;
    postCode: string;
    telNo: string;
    extNo: string;
    faxNo: string;
    emailId: string;
    activeStatus: string;
    updatedBy: string;
    updatedOn: string;
}

export interface BranchPostDto extends Omit<BranchGetDto, 'updatedOn'> { }