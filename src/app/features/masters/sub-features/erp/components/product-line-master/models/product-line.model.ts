export interface ProductLineGetDto {
    prodTypeCode: string;
    prodTypeDesc: string;
    category: string;
    active: string;
    updatedBy: string;
    updatedOn: string;
}

export interface ProductLinePostDto  extends Omit<ProductLineGetDto, 'updatedOn'> { } 