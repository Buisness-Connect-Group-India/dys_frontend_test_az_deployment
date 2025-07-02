export interface CustomerComplaintGetDto {
    accepted: string | null;
    addrId: string;
    address: string;
    callId: string;
    covType: string;
    custId: string;
    custName: string;
    custRequest: string;
    desc: string;
    macSrNo: string;
    mobileNo: string;
    priority: string;
    prodId: string;
    prodTypeCode: string;
    product: string;
    regDate: string;
    repType: string;
    status: string;
    type: string;
    updatedBy:string,
    updatedOn:string;
}
export interface CustomerComplaintPostDto extends Omit<CustomerComplaintGetDto, 'updatedBy'|'updatedOn'> { }