export interface BrandGetDto{
  brandCode: string;
  brandDesc: string;
  updatedBy: string;
  updatedOn: string;
}

export interface BrandPostDto extends Omit<BrandGetDto, 'updatedOn'> { } 