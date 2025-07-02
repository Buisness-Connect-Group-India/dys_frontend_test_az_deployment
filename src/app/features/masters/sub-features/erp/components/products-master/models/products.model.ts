export interface ProductsGetDto {
    prodCode: string;
    prodDesc: string;
    modelCode: string;
    prodTypeCode: string;
    prodGrpCode: string;
    brandCode: string;
    itemCat: string;
    isActive: string;
    updatedBy: string;
    updatedOn: string;
}

export interface ProductsPostDto extends Omit<ProductsGetDto, 'updatedOn'> { }
