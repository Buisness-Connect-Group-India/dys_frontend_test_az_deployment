export interface CustomerProductsGetDto {
    prodId: string;
    repProdId: string;
    sourceProdId: string;
    custId: string;
    prodTypeCode: string;
    prodGrpCode: string;
    brandCode: string;
    prodCode: string;
    alienModel: string;
    purcDate: string;
    macSrNo: string;
    modelDesc: string;
    retailerCode: string;
    batchNo: string;
    syncToCrm: string;
    status: string;
    repReference: string;
    regByEnt: string;
    updatedBy: string;
    updatedOn: string;
}

export interface CustomerProductsPostDto extends Omit<CustomerProductsGetDto, 'updatedBy' | 'updatedOn'> { }