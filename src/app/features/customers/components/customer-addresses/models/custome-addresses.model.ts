export interface CustomerAddressesGetDto {
    addrId:string;
    mainAddress: string;
    custId: string;
    aType: string;
    salutation: string;
    firstName: string;
    lastName: string;
    addr1: string;
    addr2: string;
    addr3: string;
    addr4: string;
    addr5: string;
    landmark: string;
    areaCode: string;
    cityCode: string;
    stateCode: string;
    branchCode: string;
    countryCode: string;
    postCode: string;
    emailId: string;
    altEmailId: string;
    mobileNo: number;
    altMobileNo: number;
    resiNo: string;
    offPhone: number;
    offExtnNo: number;
    faxNo: number;
    status: string;
    updatedBy: string;
    updatedOn: string;
}

//  addrId: string;
export interface CustomerAddressesPostDto extends Omit<CustomerAddressesGetDto, 'updatedOn' | 'updatedBy'> { }