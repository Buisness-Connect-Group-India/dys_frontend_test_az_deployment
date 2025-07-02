export interface TaxGetDto {
    id: string;
    taxNo: string;
    taxPerc: number;
    taxLabel: string;
    branchCode: string;
    fromDate: string;
    toDate: string;
    updatedBy: string;
    updatedOn: string;
}

export interface TaxPostDto extends Omit<TaxGetDto, 'updatedOn'> { } 