export interface SpareItemGetDto {
    spItemCode: string;
    spItemDesc: string;
    prodTypeCode: string;
    uom: string;
    cost: number;
    price: number;
    itemType: string;
    remarks: string;
    minOrderQty: number;
    isActive: string;
    updatedBy: string;
    updatedOn: string;
}
export interface SpareItemPostDto extends Omit<SpareItemGetDto, 'updatedOn'> { } 