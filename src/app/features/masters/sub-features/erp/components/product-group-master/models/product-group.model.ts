export interface ProductGroupGetDto {
    prodGrpCode: string;
    prodGrpDesc: string;
    updatedBy: string;
    updatedOn: string;
}
export interface ProductGroupPostDto extends Omit<ProductGroupGetDto, 'updatedOn'> { } 