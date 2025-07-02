export interface CommonCodeGetDto {
  id: string;
  code: string;
  desc: string;
  status: string;
  updatedBy: string;
  updatedOn: string; 
}
export interface CommonCodePostDto extends Omit<CommonCodeGetDto, 'updatedOn'| 'updatedBy'> { } 
